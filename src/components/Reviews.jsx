import { addDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import swal from "sweetalert";
import { Appstate } from "../App";
import { reviewsRef, db } from "./firebase/firebase";

const Reviews = ({ id, prevRating, userRated }) => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [rating, setRating] = useState(0);
  const [form, setform] = useState("");
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ReviewLoading, setReviewLoading] = useState(false);
  const [Added, setAdded] = useState(0);


  const sendReview = async () => {
    setLoading(true);
    if (useAppstate.login) {
      await addDoc(reviewsRef, {
        Movieid: id,
        Name: useAppstate.userName,
        rating: rating,
        Thoughts: form,
        Timestamp: new Date().getTime(),
      });
      const ref = doc(db, "Movies", id);
      await updateDoc(ref, {
        rating: rating + prevRating,
        user: userRated + 1,
      });

      setRating(0);
      setform("");
      setAdded(Added+1);
      swal({
        title: "Review added successfully",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
    }else{
      navigate('/login')
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setdata([])
      let queryy = query(reviewsRef, where("Movieid", "==", id));
      const querysnap = await getDocs(queryy);

      querysnap.forEach((doc) => {
        setdata((prev) => [...prev, doc.data()]);
      });
      setReviewLoading(false);
    }
    getData();
  }, [Added]);

  return (
    <div className="mt-4 border-t-2 border-gray-600 w-full">
      <ReactStars
        size={40}
        value={rating}
        half={true}
        onChange={(rate) => setRating(rate)}
      />

      <input
        value={form}
        onChange={(e) => setform(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-2 outline-none header bg-[#15161a]"
      />
      <button
        onClick={sendReview}
        className="bg-green-500 flex justify-center w-full p-2 mt-3"
      >
        {Loading ? <ThreeDots height={20} color="white" /> : "Share"}
      </button>

      {ReviewLoading ? (
        <div className="w-full flex justify-center mt-7">
          <ThreeCircles height={40} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((rev, index) => {
            return (
              <div
                key={index}
                className="bg-gray-700 p-2 w-full shadow-md shadow-gray-200 mt-2"
              >
                <div className="flex items-center">
                  <p className="text-blue-600 text-xl">{rev.Name}</p>
                  <p className="ml-3 text-md">
                    {new Date(rev.Timestamp).toLocaleString()}
                  </p>
                </div>
                <ReactStars
                  size={20}
                  value={rev.rating}
                  half={true}
                  edit={false}
                />
                <p className="text-lg">{rev.Thoughts}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;

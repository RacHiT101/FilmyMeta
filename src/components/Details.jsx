import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { ThreeCircles } from "react-loader-spinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import Reviews from "./Reviews";

const Details = () => {
  const { id } = useParams();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rating: 0,
    user: 0,
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "Movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row md:items-start w-full justify-center font-poppins">
      {Loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <ThreeCircles height={30} color="white" />
        </div>
      ) : (
        <>
          <img src={data.image} className="h-96 sticky top-24" alt="#"></img>
          <div className="md:ml-4 md:w-1/2 w-full">
            <h1 className="text-3xl font-semibold text-gray-400">
              {data.title} <span className="text-lg">({data.year})</span>
            </h1>
            <ReactStars size={20} value={data.rating/data.user} edit={false} half={true} />
            <p className="mt-3">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.user}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;

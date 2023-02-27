import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { moviesRef } from "./firebase/firebase";

const Cards = () => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...(doc.data()), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between mt-2 p-2 font-montserrat">
      {Loading ? (
        <div className="w-full flex justify-center h-96 items-center">
          <ThreeDots color="white" height={40} />
        </div>
      ) : (
        data.map((movie, index) => {
          return (
            <Link to={`/details/${movie.id}`}>
              
              <div
                key={index}
                className="card rounded-lg shadow-lg p-2 hover:-translate-y-4 transition-all duration-500 cursor-pointer mt-6"
              >
                <img src={movie.image} alt="-" className="h-80" />
                <h1>
                  <span className="text-gray-500">Name:</span> {movie.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-gray-500 mr-1">Rating:</span>
                  <ReactStars size={20} value={movie.rating/movie.user} edit={false} half={true} />
                </h1>
                <h1>
                  <span className="text-gray-500">Year:</span> {movie.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;

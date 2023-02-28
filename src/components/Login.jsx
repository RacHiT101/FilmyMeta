import { getDocs, query, where } from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UsersRef } from "./firebase/firebase";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const login = async () => {
    setLoading(true);
    try {
      const queryy = query(UsersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(queryy);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync( form.password , _data.password);
        if( isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 2000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div className="w-full flex flex-col mt-10 items-center">
      <h1 className="font-montserrat font-bold  text-2xl">Login</h1>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="email" class="leading-7 text-md text-white">
            MobileNo
          </label>
          <input
            type={"number"}
            id=""
            name=""
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="email" class="leading-7 text-lg text-white">
            Password
          </label>
          <input
            type=""
            id=""
            name=""
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
          />
        </div>
      </div>
      <div class="p-2 w-1/3 my-2">
        <button
        onClick={login}
        class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {Loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>
          Do not have account?
          <Link to={"/signup"}>
            <span className="text-blue-500 ml-2 font-montserrat">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase/firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { UsersRef } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);
  const [sentOtp, setsentOtp] = useState(false);
  const [Otp, setOtp] = useState("");
  const auth = getAuth(app);

  const generateReCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateReCaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        setsentOtp(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOtp = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(Otp).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async () => {
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(form.password, salt);

    await addDoc(UsersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile,
    });
  };

  return (
    <div className="w-full flex flex-col mt-10 items-center">
      <h1 className="font-montserrat font-bold  text-2xl">Sign Up</h1>
      {sentOtp ? (
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label class="leading-7 text-lg text-white">Enter OTP</label>
              <input
                id=""
                value={Otp}
                onChange={(e) => setOtp(e.target.value)}
                class="mt-1 w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
              />
            </div>
          </div>
          <div class="p-2 w-1/3 my-2">
            <button
              onClick={verifyOtp}
              class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
            >
              {Loading ? <TailSpin height={25} color="white" /> : "Confirm"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="email" class="leading-7 text-lg text-white">
                Username
              </label>
              <input
                type=""
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
              />
            </div>
          </div>
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
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                class="w-full bg-gray-300  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-sm shadow-white"
              />
            </div>
          </div>
          <div class="p-2 w-1/3 my-2">
            <button
              onClick={requestOtp}
              class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
            >
              {Loading ? (
                <TailSpin height={25} color="white" />
              ) : (
                "Request OTP "
              )}
            </button>
          </div>
        </>
      )}
      <div>
        <p>
          Already have an account?!
          <Link to={"/login"}>
            <span className="text-blue-500 ml-2 font-montserrat">Login </span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;

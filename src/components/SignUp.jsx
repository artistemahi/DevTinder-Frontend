// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const signup = async () => {
    try {
      if (user) {
        navigate("/");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          email,
          password,
          age: Number(age),
          gender,
        },
        { withCredentials: true },
      );
      (dispatch(addUser(res?.data?.data)), navigate("/profile"));
      setTimeout(() => {
        setShowToast(true);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message,
      );
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
        <div className=" flex justify-center items-center text-lg font-bold">
          Welcome To DevTinder
        </div>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input pl-4"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input pl-4"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input pl-4"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input pl-4"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label className="label">Age</label>
        <input
          type="number"
          className="input pl-4"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />

        <label className="label">Gender</label>
        <select
          className="select select-bordered w-full pl-4"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <p className="bg-red-500 text-center">{error}</p>
        <button
          className="btn btn-neutral mt-4 text-white font-bold bg-blue-500 hover:bg-blue-300"
          onClick={signup}
        >
          Sign Up
        </button>
      </fieldset>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Sign Up Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

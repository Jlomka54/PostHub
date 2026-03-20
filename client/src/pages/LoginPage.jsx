import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../store/auth/authOperations";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => Boolean(state.auth.token));

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-jg text-white text-center mb-2">Login</h1>
      <label className=" text-sx text-gray-400">
        Username:
        <input
          type="text"
          autoComplete="username"
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className=" text-sx text-gray-400">
        Password:
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Password"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button type="submit" className="bg-gray-500 text=xs text-white px-4 py-2 rounded-md">
          Login
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white "
        >
          Register
        </Link>
      </div>
    </form>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../store/auth/authOperations";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, status } = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => Boolean(state.auth.token));

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const handleSubmit = async () => {
    try {
      await dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-jg text-white text-center mb-2">Register</h1>
      <label className=" text-sx text-gray-400">
        Username:
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Username"
        />
      </label>

      <label className=" text-sx text-gray-400">
        Password:
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Password"
        />
      </label>

      {status && (
        <p className="mt-3 text-xs text-center text-gray-300">{status}</p>
      )}

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="bg-gray-500 text=xs text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white "
        >
          Login
        </Link>
      </div>
    </form>
  );
};

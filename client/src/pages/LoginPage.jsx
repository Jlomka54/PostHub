import React from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-jg text-white text-center mb-2">Login</h1>
      <lable className=" text-sx text-gray-400">
        Username:
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Username"
        />
      </lable>

      <lable className=" text-sx text-gray-400">
        Password:
        <input
          type="password"
          className="w-full p-2 rounded-md bg-gray-700 text-white text-xs mt-1 placeholder-gray-500"
          placeholder="Password"
        />
      </lable>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="bg-gray-500 text=xs text-white px-4 py-2 rounded-md"
        >
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

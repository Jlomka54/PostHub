import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/post/PostOperations.js";
import { useNavigate } from "react-router-dom";

export const AddPostsPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      if (image) {
        data.append("image", image);
      }
      await dispatch(createPost(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const clearFormHandler = () => {
    setTitle("");
    setText("");
    setImage(null);
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-800 text-sx mt-2 flex items-center justify-center border-2   cursor-pointer">
        Add images
        <input
          type="file"
          name="image"
          className="hidden"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
      </label>
      <div className="flex flex-col object-cover gap-2">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
      <label className=" text-xs text-white opacity-70">
        Add title
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          name="title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-800"
          placeholder="Enter post title"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Add description
        <textarea
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="mt-1 text-black w-full rounded-lg resize-none h-24 bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-800"
          placeholder="Enter post description"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className=" flex items-center text-xs bg-green-500 text-white py-2 px-4 rounded-sm mt-4"
          onClick={submitHandler}
        >
          Add post
        </button>
        <button
          onClick={clearFormHandler}
          className=" flex items-center text-xs bg-red-500 text-white py-2 px-4 rounded-sm mt-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

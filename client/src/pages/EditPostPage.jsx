import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

export const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axiosInstance.get(`/posts/${params.id}`);
    setTitle(data.post.title);
    setText(data.post.text);
    setOldImage(data.post.imageUrl);
  }, [params.id]);

  const submitHandler = async () => {
    try {
      const updated = new FormData();
      updated.append("title", title);
      updated.append("text", text);
      if (newImage) {
        updated.append("image", newImage);
      }

      await axiosInstance.put(`/posts/${params.id}`, updated);
      navigate("/");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
    setOldImage(null);
    setNewImage(null);
  };

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-800 text-sx mt-2 flex items-center justify-center border-2   cursor-pointer">
        Add images
        <input
          type="file"
          name="image"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage(null);
          }}
        />
      </label>
      <div className="flex flex-col object-cover gap-2">
        {oldImage && (
          <img
            src={`http://localhost:3002/${oldImage} `}
            alt={oldImage.name}
            className="max-w-full max-h-full object-contain"
          />
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt={newImage.name}
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
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-lg outline-none placeholder:text-gray-800"
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
          className="mt-1 text-black w-full rounded-lg resize-none h-24 bg-gray-400 border py-1 px-2 text-lg outline-none placeholder:text-gray-800"
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

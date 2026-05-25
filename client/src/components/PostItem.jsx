import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-center text-white">No post data available.</div>
    );
  }

  const formattedDate = post.createdAt
    ? moment(post.createdAt).locale("en").calendar(undefined, {
        sameDay: "[Today at] HH:mm",
        lastDay: "[Yesterday at] HH:mm",
        lastWeek: "dddd [at] HH:mm",
        sameElse: "D MMMM YYYY [at] HH:mm",
      })
    : "";

  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <div
        className={
          post.imgUrl ? "flex rounded-sm h-80 bg-black/20" : "flex rounded-sm"
        }
      >
        {post.imgUrl && (
          <img
            src={`http://localhost:3002/${post.imgUrl}`}
            alt={post.title}
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs font-bold text-white opacity-50">
          {post.username}
        </div>
        <div className="text-xs font-bold text-white opacity-50">
          {formattedDate}
        </div>
      </div>
      <Link
        to={`/${post._id}`}
        className="pt-2 text-lg font-bold text-white opacity-70 hover:opacity-100 transition-opacity"
      >
        {post.title}
      </Link>
      <p className="py-4 text-base text-white opacity-60">{post.text}</p>

      <div className="flex items-center gap-3 justify-between">
        <div className="flex  gap-3">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views || 0}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

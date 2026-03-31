import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import moment from "moment";
import "moment/locale/ru";

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-white text-center">No post data available.</div>
    );
  }

  const formattedDate = post.createdAt
    ? moment(post.createdAt).locale("ru").calendar(undefined, {
        sameDay: "[Сегодня в] HH:mm",
        lastDay: "[Вчера в] HH:mm",
        lastWeek: "dddd [в] HH:mm",
        sameElse: "D MMMM YYYY [в] HH:mm",
      })
    : "";

  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
        {post.imgUrl && (
          <img
            src={`http://localhost:3002/${post.imgUrl}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-white opacity-50 font-bold">
          {post.username}
        </div>
        <div className="text-xs text-white opacity-50 font-bold">
          {formattedDate}
        </div>
      </div>
      <div className="text-sm text-white opacity-70 pt-2">{post.title}</div>
      <p className="text-white opacity-60 text-xs py-4 ">{post.text}</p>

      <div className="flex gap-3 items-center">
        <button className="flex items-center justify-center  gap-2 text-xs text-white opacity-50">
          <AiFillEye />
          <span>{post.views || 0}</span>
        </button>
        <button className="flex items-center justify-center  gap-2 text-xs text-white opacity-50">
          <AiOutlineMessage />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

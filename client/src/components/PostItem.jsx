import React from "react";
import { AiFillDelete, AiFillEye, AiOutlineMessage } from "react-icons/ai";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../store/post/PostOperations";
import { getImageUrl } from "../utils/image";

export const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

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
  const authorId =
    typeof post.author === "object" ? post.author?._id : post.author;
  const currentUserId = currentUser?._id || currentUser?.id;
  const isPostAuthor = authorId === currentUserId;

  const deletePostHandler = async () => {
    await dispatch(deletePost(post._id));
    navigate("/posts");
  };

  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <div
        className={
          post.imgUrl ? "flex rounded-sm h-80 bg-black/20" : "flex rounded-sm"
        }
      >
        {post.imgUrl && (
          <img
            src={getImageUrl(post.imgUrl)}
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
        {isPostAuthor && (
          <button
            type="button"
            onClick={deletePostHandler}
            className="flex items-center justify-center gap-2 text-xs text-red-500 opacity-70 transition-opacity hover:opacity-100"
          >
            <AiFillDelete />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

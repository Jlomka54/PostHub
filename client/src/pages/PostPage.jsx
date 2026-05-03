import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PostItem } from "../components/PostItem";
import { getPostById } from "../store/post/PostOperations";

export const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="py-10 text-center text-white">Loading post...</div>;
  }

  if (!currentPost) {
    return <div className="py-10 text-center text-white">Post not found.</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <Link
        to="/posts"
        className="inline-flex items-center rounded-sm bg-gray-600 px-4 py-2 text-xs text-white"
      >
        Back to posts
      </Link>

      <div className="py-8">
        <PostItem post={currentPost} />
      </div>
    </div>
  );
};

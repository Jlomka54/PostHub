import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostItem } from "../components/PostItem";
import { getAllPosts } from "../store/post/PostOperations";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div className="py-10 text-center text-white">Loading posts...</div>;
  }

  if (!posts.length) {
    return (
      <div className="max-w-[900px] mx-auto py-10 text-center text-white">
        No posts available.
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex flex-col gap-10 text-white">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

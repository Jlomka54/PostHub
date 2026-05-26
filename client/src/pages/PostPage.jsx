import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CommentItem } from "../components/CommentItem";
import { PostItem } from "../components/PostItem";
import { createComment } from "../store/comment/commentOperations";
import { getPostById } from "../store/post/PostOperations";

export const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const { currentPost, isLoading } = useSelector((state) => state.posts);
  const { comments, isLoading: isCommentLoading } = useSelector(
    (state) => state.comment,
  );
  const currentUser = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => Boolean(state.auth.token));

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

  const authorId =
    typeof currentPost.author === "object"
      ? currentPost.author?._id
      : currentPost.author;
  const currentUserId = currentUser?._id || currentUser?.id;
  const isPostAuthor = authorId === currentUserId;

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      setCommentError("Comment is required");
      return;
    }

    try {
      setCommentError("");
      await dispatch(
        createComment({ postId: currentPost._id, comment: trimmedComment }),
      ).unwrap();
      setComment("");
    } catch (error) {
      setCommentError(error?.message || "Failed to create comment");
    }
  };

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex items-center gap-3">
        <Link
          to="/posts"
          className="inline-flex items-center rounded-sm bg-gray-600 px-4 py-2 text-xs text-white"
        >
          Back to posts
        </Link>
        {isPostAuthor && (
          <Link
            to={`/${currentPost._id}/edit`}
            className="inline-flex items-center rounded-sm bg-green-600 px-4 py-2 text-xs text-white"
          >
            Edit post
          </Link>
        )}
      </div>

      <div className="py-8">
        <PostItem post={currentPost} />
      </div>

      <div className="border-t border-gray-700 pt-8 text-white">
        <h2 className="mb-4 text-lg font-bold opacity-80">Comments</h2>

        {isAuth ? (
          <form className="mb-6 flex gap-3" onSubmit={submitCommentHandler}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-w-0 flex-1 rounded-sm border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
              placeholder="Add a comment"
            />
            <button
              type="submit"
              disabled={isCommentLoading}
              className="rounded-sm bg-green-600 px-4 py-2 text-xs text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        ) : (
          <div className="mb-6 rounded-sm bg-gray-800 p-4 text-sm opacity-70">
            Login to add a comment.
          </div>
        )}

        {commentError && <p className="mb-4 text-xs text-red-400">{commentError}</p>}

        <div className="flex flex-col gap-3">
          {comments.length ? (
            comments.map((item) => (
              <CommentItem key={item._id} comment={item} />
            ))
          ) : (
            <div className="rounded-sm bg-gray-800 p-4 text-sm opacity-60">
              No comments yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

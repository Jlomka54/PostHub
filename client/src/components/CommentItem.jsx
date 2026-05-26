import moment from "moment";

export const CommentItem = ({ comment }) => {
  const authorName =
    typeof comment.author === "object" ? comment.author?.username : "User";
  const formattedDate = comment.createdAt
    ? moment(comment.createdAt).locale("en").calendar(undefined, {
        sameDay: "[Today at] HH:mm",
        lastDay: "[Yesterday at] HH:mm",
        lastWeek: "dddd [at] HH:mm",
        sameElse: "D MMMM YYYY [at] HH:mm",
      })
    : "";

  return (
    <div className="rounded-sm bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold opacity-70">{authorName}</span>
        <span className="text-xs opacity-40">{formattedDate}</span>
      </div>
      <p className="mt-2 text-sm opacity-80">{comment.comment}</p>
    </div>
  );
};

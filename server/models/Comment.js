import mongoos from "mongoose";
const CommentSchema = new mongoos.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    author: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoos.model("Comment", CommentSchema);

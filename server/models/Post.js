import mongoos from "mongoose";
const PostSchema = new mongoos.Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoos.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoos.model("Post", PostSchema);

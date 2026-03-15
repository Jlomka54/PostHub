import mongoos from "mongoose";
const UserSchema = new mongoos.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      alias: "username",
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoos.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoos.model("User", UserSchema);

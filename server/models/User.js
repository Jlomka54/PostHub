import mongoos from "mongoose";
const UserSchema = new mongoos.Schema(
  {
    username: {
      type: String,
      reqrired: true,
      unique: true,
    },
    password: {
      type: String,
      reqrired: true,
    },
    posts: [
      {
        type: mongoos.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    Timestamp: true,
  },
);

export default mongoos.model("User", UserSchema);

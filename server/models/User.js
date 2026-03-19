import mongoos from "mongoose";
const UserSchema = new mongoos.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

UserSchema.virtual("userName")
  .get(function () {
    return this.username;
  })
  .set(function (value) {
    this.username = value;
  });

UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export default mongoos.model("User", UserSchema);

import mongo from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongo.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique:true
    },
    location: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongo.model("User", UserSchema);
export default User;

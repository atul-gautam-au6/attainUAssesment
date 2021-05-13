import mongo from "mongoose";

const postsSchema = new mongo.Schema(
  {
   admin:{
    type: mongo.Schema.Types.ObjectId,
    ref: "User",
   },
    name: {
      type: String,
      required: true,
    },
    contains:{
        type:String,
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
     
  },
  { timestamps: true }
);


const Posts = mongo.model("posts", postsSchema);
export default Posts;

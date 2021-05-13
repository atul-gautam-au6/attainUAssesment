import Posts from "../model/Posts.js";

//get Routes
//secure by user

const getAllPost = async (req, res) => {
  try {
    const getPosts = await Posts.find({ isDeleted: false });
    res.status(200).json({
      errorCode: 0,
      errorMesseagse: getPosts.length < 0 ? "Empty posts" : "post founded",
      list: getPosts,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 1,
      errorMesseagse: error.message,
    });
  }
};

// /@secure routes by admin
// @@Post Routes
const createPost = async (req, res) => {
  const { name, contains } = req.body;
  try {
    if ((!name&&!contains)) {
      res.status(400).json({
        errorCode: 1,
        errorMesseagse: "All Feilds are required",
      });
    } else {
      const existName = await Posts.findOne({ name: name });
      if (!existName) {
        const newPost = await Posts.create({ ...req.body, admin: req.user.id });
       await newPost.save();
        if (newPost) {
          res.status(201).json({
            errorCode: 0,
            errorMesseagse: "postscreated",
            post: newPost,
          });
        } else {
          res.status(400).json({
            errorCode: 1,
            errorMesseagse: "server error",
          });
        }
      } else {
        res.status(400).json({
          errorCode: 1,
          errorMesseagse:
            "This Title already haved in db,please use diffrent title",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      errorCode: 1,
      errorMesseagse: error.message,
    });
  }
};

//update posts
//secure by admin
//routes-- /admin/posts/:id
const upDatePost = async (req, res) => {
  const findPost = await Posts.findById(req.params.id);
  if (!findPost) {
    res.status(404).json({
      errorCode: 1,
      errorMesseagse: "posts not found",
    });
  } else {
    // check the creator
    if (findPost.admin.toString() === req.user.id.toString()) {
      findPost.name = req.body.name || findPost.name;
      findPost.contains = req.body.contains || findPost.contains;
      findPost.isDeleted = req.body.isDeleted || findPost.isDeleted;
      const saveposts = await findPost.save();
      if (saveposts) {
        res.status(200).json({
          errorCode: 0,
          errorMesseagse: "posts updated",
          posts: saveposts,
        });
      } else {
        res.status(500).json({
          errorCode: 1,
          errorMesseagse: "Server error",
        });
      }
    } else {
      res.status(404).json({
        errorCode: 1,
        errorMesseagse: "YOur are not Author of this posts",
      });
    }
  }
};

export { createPost, getAllPost, upDatePost };

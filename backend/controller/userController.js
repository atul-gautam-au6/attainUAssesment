import User from "../model/UserModel.js";
import generateToken from "../utils/generateToken.js";

//user signinUp Process
//@user Post Route ---> /users/signup
const UserSignUp = async (req, res) => {
  const { name, email, password, phone, location } = req.body;
  try {
    //if no data in all feilds
    if (!email && !name && !phone && !location && !password) {
      res.status(400).json({
        errorCode: 1,
        errorMesseagse: "All Feilds are required",
      });
    }
    //all feils are fullfill
    else {
      const existUser = await User.findOne({ email: email });

      //check this email is already used or not
      if (!existUser) {
        const newUser =await User.create({ ...req.body });
        newUser.save();
        if (newUser) {
          res.status(201).json({
            errorCode: 0,
            errorMesseagse: "User Created ",
            User: newUser,
          });

          //if  email are exist here
        } else {
          res.status(500).json({
            errorCode: 1,
            errorMesseagse: "Server Error",
          });
        }
      } else {
        res.status(400).json({
          errorCode: 1,
          errorMesseagse: "User Already Exist",
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

//user signinin Process
//@user Post Route ---> /users/signin

const AuthUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      res.status(400).json({
        errorCode: 1,
        errorMesseagse: "All Feilds are required",
      });
    } else {
      const getUser = await User.findOne({ email: email });
    
      if (
        getUser &&
        !getUser.isDeleted &&
        (await getUser.matchPassword(password))
      ) {
        if (getUser.isActive) {
          // console.log(
          //   generateToken(getUser.id)
          // )
          res.status(200).json({
            errorCode: 0,
            errorMessage: "User Found",
            user: {
              _id: getUser.id,
              name: getUser.name,
              email: getUser.email,
              token: generateToken(getUser.id),
            },
          });
        }
        // if user is inactive
        else {
          res.status(404).json({
            errorCode: 1,
            errorMessage: "User is Inactive please connect your highAuthority",
          });
        }
      } else {
        res.status(404).json({
          errorCode: 1,
          errorMessage: "Invalid Credentials",
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

export { UserSignUp, AuthUser };
// await getUser.matchPassword(req.body.password)

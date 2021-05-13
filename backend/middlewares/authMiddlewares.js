import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      try {
          token = req.headers.authorization.split(" ")[1];       
          const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized no token" });
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized token failed" });
  }
}
const adminProtect = (req, res, next) => {
  // console.log(req.admin);
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized as an admin" });
  }
};

export { protect ,adminProtect};

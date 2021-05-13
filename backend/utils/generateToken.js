import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
// console.log( process.env.JWT_SECRET)
const generateToken = (id, day) => {
 
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: day ? `${day}d` : "30d",
  });
};

export default generateToken;

import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import * as morgan from "morgan";

//Routes
import userRoutes from "./routes/userRoutes.js";
import adminPosts from "./routes/postsRoutes.js";


dotenv.config();
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan('combined'));
}
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/admin", adminPosts);






if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("index");
  });
}

// Error npm run serverMiddlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${PORT}`
  )
);

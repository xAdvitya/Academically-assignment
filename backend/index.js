import express from "express";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//setting up routes
app.use("/", courseRoute);
app.use("/auth", authRoute);

//run the express server
app.listen(process.env.PORT, () => {
  console.log(`server running on {process.env.PORT}`);
});

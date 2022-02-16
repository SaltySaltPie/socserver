import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport";
const app = express();

//---------ConnectDB----------------------------------------------------------------------------------------------------------------------------
import "./db/mongoose";
import AuthRouter from "./routes/Auth";
import TestRouter from "./routes/Test";
import ApiRouter from "./routes/Api";
import PostsRouter from "./routes/Posts";
import UserRouter from "./routes/User";
import PostRouter from "./routes/Post";
////-------------------------------------------------------------------------------------------------------------------------------------

//---------SETUP CORS----------------------------------------------------------------------------------------------------------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://chatspace-jimbui.herokuapp.com/",
  "https://chatspace-jimbui.netlify.com/",
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(options));
////-------------------------------------------------------------------------------------------------------------------------------------

//---------SETUP SESSION + STORE----------------------------------------------------------------------------------------------------------------------------
app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({ mongoUrl: `${process.env.MONGO_URI}` }),
  })
);
////-------------------------------------------------------------------------------------------------------------------------------------

//---------MIDDLEWARES----------------------------------------------------------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
////-------------------------------------------------------------------------------------------------------------------------------------

//---------Routing----------------------------------------------------------------------------------------------------------------------------
app.use("/test", TestRouter);
app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);
app.use("/posts", PostsRouter);
app.use("/post", PostRouter);
app.use("/user", UserRouter);
////-------------------------------------------------------------------------------------------------------------------------------------

app.get("/", (req: Request, res: Response) => {
  console.log(`Pinged`);
  res.status(200).json({ success: true });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

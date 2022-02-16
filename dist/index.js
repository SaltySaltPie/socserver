"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const express_session_1 = (0, tslib_1.__importDefault)(require("express-session"));
const connect_mongo_1 = (0, tslib_1.__importDefault)(require("connect-mongo"));
require("./config/passport");
const app = (0, express_1.default)();
//---------ConnectDB----------------------------------------------------------------------------------------------------------------------------
require("./db/mongoose");
const Auth_1 = (0, tslib_1.__importDefault)(require("./routes/Auth"));
const Test_1 = (0, tslib_1.__importDefault)(require("./routes/Test"));
const Api_1 = (0, tslib_1.__importDefault)(require("./routes/Api"));
const Posts_1 = (0, tslib_1.__importDefault)(require("./routes/Posts"));
const User_1 = (0, tslib_1.__importDefault)(require("./routes/User"));
const Post_1 = (0, tslib_1.__importDefault)(require("./routes/Post"));
////-------------------------------------------------------------------------------------------------------------------------------------
//---------SETUP CORS----------------------------------------------------------------------------------------------------------------------------
const allowedOrigins = [
    "http://localhost:3000",
    "https://chatspace-jimbui.herokuapp.com/",
    "https://chatspace-jimbui.netlify.app/",
];
const options = {
    origin: allowedOrigins,
    credentials: true,
};
app.use((0, cors_1.default)(options));
////-------------------------------------------------------------------------------------------------------------------------------------
//---------SETUP SESSION + STORE----------------------------------------------------------------------------------------------------------------------------
app.use((0, express_session_1.default)({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: connect_mongo_1.default.create({ mongoUrl: `${process.env.MONGO_URI}` }),
}));
////-------------------------------------------------------------------------------------------------------------------------------------
//---------MIDDLEWARES----------------------------------------------------------------------------------------------------------------------------
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
////-------------------------------------------------------------------------------------------------------------------------------------
//---------Routing----------------------------------------------------------------------------------------------------------------------------
app.use("/test", Test_1.default);
app.use("/auth", Auth_1.default);
app.use("/api", Api_1.default);
app.use("/posts", Posts_1.default);
app.use("/post", Post_1.default);
app.use("/user", User_1.default);
////-------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
    console.log(`Pinged`);
    res.status(200).json({ success: true });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
//# sourceMappingURL=index.js.map
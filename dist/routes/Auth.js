"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const User_1 = require("../models/User");
const checkExistingUser_1 = require("../middlewares/checkExistingUser");
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const passwordUtils_1 = require("../lib/passwordUtils");
const AuthRouter = express_1.default.Router();
AuthRouter.post("/login", 
// (req: Request, res: Response, next: NextFunction) => {
//   console.log({ req: req.session });
//   next();
// },
passport_1.default.authenticate("local", {
    failureMessage: true,
    successMessage: true,
}), (req, res, next) => {
    console.log({ reqUserAuth: req.user });
    // req.session.user = req.user
    // res.json(req.user)
    res.status(200).json({ success: true, redirect: "/", user: req.user });
});
AuthRouter.post("/register", checkExistingUser_1.checkExistingUser, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    console.log(`pingedRes`);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ success: false, msg: `empty` });
    }
    else {
        try {
            const { salt, hash } = (0, passwordUtils_1.genPassword)(req.body.password);
            const newUser = yield User_1.User.create({ username, email, salt, hash });
            console.log({ newUserCreated: newUser.username });
            if (newUser)
                res.status(200).json({ success: true, redirect: "/login" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, msg: `sys error` });
        }
    }
}));
AuthRouter.post("/logout", (req, res) => {
    req.logout();
    res.status(200).json({ success: true, redirect: "/" });
});
exports.default = AuthRouter;
//# sourceMappingURL=Auth.js.map
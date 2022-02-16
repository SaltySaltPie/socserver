"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistingUser = void 0;
const tslib_1 = require("tslib");
const User_1 = require("../models/User");
const checkExistingUser = (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        console.log(`check Existing User`);
        const emailCheck = yield User_1.User.find({ email: req.body.email });
        if (emailCheck.length > 0)
            return res
                .status(200)
                .json({ success: false, msg: `email existed`, ec: "ee" });
        const username = yield User_1.User.find({ username: req.body.username });
        if (username.length > 0)
            return res
                .status(200)
                .json({ success: false, msg: `username existed`, ec: "uc" });
        next();
    }
    catch (error) {
        console.log({ error });
    }
});
exports.checkExistingUser = checkExistingUser;
//# sourceMappingURL=checkExistingUser.js.map
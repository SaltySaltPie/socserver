"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const passport_local_1 = require("passport-local");
const passwordUtils_1 = require("../lib/passwordUtils");
const User_1 = require("../models/User");
// const verifyCB = (username: string, password: string, done: any) => {};
// const strategy = new LocalStrategy({}, verifyCB);
// passport.use(strategy);
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "username", passwordField: "password" }, (username, password, cb) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        console.log(`localStrat`);
        const user = yield User_1.User.findOne({ username }).select([
            "username",
            "hash",
            "salt",
        ]);
        if (!user)
            return cb(null, false);
        if ((0, passwordUtils_1.validPassword)({ password, hash: user.hash, salt: user.salt })) {
            console.log(`correct pass`);
            return cb(null, user);
        }
        else
            return cb(null, false);
    }
    catch (error) {
        cb(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(id).select(["_id", "username"]);
        if (user) {
            return done(null, user);
        }
    }
    catch (error) {
        done(error);
    }
}));
//# sourceMappingURL=passport.js.map
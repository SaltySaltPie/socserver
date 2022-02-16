"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoggedIn = void 0;
const checkLoggedIn = (req, res, next) => {
    if (!req.user)
        res.status(401).json({ success: false, redirect: "/login" });
    next();
};
exports.checkLoggedIn = checkLoggedIn;
//# sourceMappingURL=checkLoggedIn.js.map
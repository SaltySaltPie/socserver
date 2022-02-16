"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const TestRouter = express_1.default.Router();
TestRouter.get("/", (req, res) => {
    console.log(`tested`);
    console.log({ sess: req.session });
    console.log({ user: req.user });
    return res.status(200).json({ success: true, user: req.user || null });
});
exports.default = TestRouter;
//# sourceMappingURL=Test.js.map
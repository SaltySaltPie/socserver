"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPassword = exports.validPassword = void 0;
const tslib_1 = require("tslib");
const crypto_1 = (0, tslib_1.__importDefault)(require("crypto"));
const validPassword = ({ password, hash, salt, }) => {
    const hashVerify = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
};
exports.validPassword = validPassword;
const genPassword = (password) => {
    const salt = crypto_1.default.randomBytes(32).toString("hex");
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return { salt, hash };
};
exports.genPassword = genPassword;
//# sourceMappingURL=passwordUtils.js.map
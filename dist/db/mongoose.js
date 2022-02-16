"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.MONGO_URI}`, (err) => {
    if (err)
        console.log({ err });
    else
        console.log(`Connected to DB!`);
});
//# sourceMappingURL=mongoose.js.map
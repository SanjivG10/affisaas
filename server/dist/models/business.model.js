"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
var mongoose_1 = require("mongoose");
var businessSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    commission: { type: Number, required: true },
    category: { type: String, required: true },
    logo: { type: String },
    ownerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
exports.Business = mongoose_1.default.model("Business", businessSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateLink = void 0;
var mongoose_1 = require("mongoose");
var affiliateLinkSchema = new mongoose_1.default.Schema({
    businessId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
exports.AffiliateLink = mongoose_1.default.model("AffiliateLink", affiliateLinkSchema);

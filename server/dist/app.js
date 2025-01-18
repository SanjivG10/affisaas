"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var express_1 = require("express");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var auth_routes_1 = require("./routes/auth.routes");
var business_routes_1 = require("./routes/business.routes");
var affiliate_routes_1 = require("./routes/affiliate.routes");
dotenv_1.default.config();
var app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/business", business_routes_1.default);
app.use("/api/affiliate", affiliate_routes_1.default);
// Database connection
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(function () {
    console.log("Connected to MongoDB");
})
    .catch(function (error) {
    console.error("MongoDB connection error:", error);
});
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
});
exports.default = app;

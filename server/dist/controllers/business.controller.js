"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBusiness = exports.getBusinessById = exports.getBusinesses = exports.createBusiness = void 0;
var business_model_1 = require("../models/business.model");
var createBusiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, website, commission, category, logo, ownerId, business, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, description = _a.description, website = _a.website, commission = _a.commission, category = _a.category, logo = _a.logo;
                ownerId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
                business = new business_model_1.Business({
                    name: name_1,
                    description: description,
                    website: website,
                    commission: commission,
                    category: category,
                    logo: logo,
                    ownerId: ownerId,
                });
                return [4 /*yield*/, business.save()];
            case 1:
                _c.sent();
                res.status(201).json(business);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                res.status(500).json({ error: "Error creating business", msg: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createBusiness = createBusiness;
var getBusinesses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var businesses, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, business_model_1.Business.find().populate("ownerId", "name email")];
            case 1:
                businesses = _a.sent();
                res.json(businesses);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: "Error fetching businesses", msg: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBusinesses = getBusinesses;
var getBusinessById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var business, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, business_model_1.Business.findById(req.params.id).populate("ownerId", "name email")];
            case 1:
                business = _a.sent();
                if (!business) {
                    res.status(404).json({ error: "Business not found" });
                    return [2 /*return*/];
                }
                res.json(business);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: "Error fetching business", msg: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBusinessById = getBusinessById;
var updateBusiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, description, website, commission, category, logo, business, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, name_2 = _a.name, description = _a.description, website = _a.website, commission = _a.commission, category = _a.category, logo = _a.logo;
                return [4 /*yield*/, business_model_1.Business.findOneAndUpdate({ _id: req.params.id, ownerId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId }, { name: name_2, description: description, website: website, commission: commission, category: category, logo: logo }, { new: true })];
            case 1:
                business = _c.sent();
                if (!business) {
                    res.status(404).json({ error: "Business not found" });
                    return [2 /*return*/];
                }
                res.json(business);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                res.status(500).json({ error: "Error updating business", msg: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateBusiness = updateBusiness;

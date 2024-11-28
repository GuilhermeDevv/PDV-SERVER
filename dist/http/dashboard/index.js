"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const DashboardController_1 = __importDefault(require("../controllers/DashboardController"));
const router = (0, express_1.Router)();
exports.dashboardRouter = router;
router.get("/", DashboardController_1.default.getDashboardData);

import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addOrder } from "../controllers/OrderControllers.js";

export const ordersRoutes = Router();

ordersRoutes.get("/create", verifyToken, addOrder)
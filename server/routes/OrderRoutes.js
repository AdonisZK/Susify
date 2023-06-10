import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addOrder, confirmOrder } from "../controllers/OrderControllers.js";

export const ordersRoutes = Router();

ordersRoutes.post("/create", verifyToken, addOrder)
ordersRoutes.put("/success", verifyToken, confirmOrder);
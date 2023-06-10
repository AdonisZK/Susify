import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addOrder, confirmOrder, getBuyerOrders } from "../controllers/OrderControllers.js";

export const ordersRoutes = Router();

ordersRoutes.post("/create", verifyToken, addOrder)
ordersRoutes.put("/success", verifyToken, confirmOrder);
ordersRoutes.get("/get-buyer-orders", verifyToken, getBuyerOrders);
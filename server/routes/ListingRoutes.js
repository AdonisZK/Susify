import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addListing, getUserAuthListing } from "../controllers/ListingControllers.js";

export const listingRoutes = Router()
const upload = multer({ dest: "uploads/" });

listingRoutes.post("/add", verifyToken, upload.array("images"), addListing)
listingRoutes.get("/get-user-listing", verifyToken, getUserAuthListing)
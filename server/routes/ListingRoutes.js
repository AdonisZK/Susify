import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { addListing, 
    getUserAuthListing, 
    getListingData, 
    editListingData, 
    searchListing,
    checkListingOrder } from "../controllers/ListingControllers.js";

export const listingRoutes = Router()
const upload = multer({ dest: "uploads/" });

listingRoutes.post("/add", verifyToken, upload.array("images"), addListing)
listingRoutes.get("/get-user-listing", verifyToken, getUserAuthListing)
listingRoutes.get("/get-listing-data/:listingId", getListingData)
listingRoutes.put("/edit-listing/:listingId", verifyToken, upload.array("images"), editListingData)
listingRoutes.get("/search-listing", searchListing)
listingRoutes.get("/check-listing-order/:listingId", verifyToken, checkListingOrder);
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { listingRoutes } from "./routes/ListingRoutes.js";

dotenv.config()

const app = express();
const port = process.env.PORT;
const origin = process.env.PUBLIC_URL;

app.use(cors({
    origin: [process.env.PUBLIC_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
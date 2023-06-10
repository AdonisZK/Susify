import { PrismaClient } from "@prisma/client";

export const addOrder = async (req, res, next) => {
    try {
        if (req.body.listingId) {
            const { listingId } = req.body;
            const prisma = new PrismaClient();
            const listing = await prisma.listing.findUnique({
                where: {id: parseInt(listingId)}
            })
            return res.status(200).json({ listing });
        }
        return res.status(400).send("ListingId is required");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

import { PrismaClient } from "@prisma/client";
import { existsSync, renameSync, unlinkSync } from "fs";

export const addListing = async (req, res, next) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const { title, description, category, price, stock } = req.query;
        const prisma = new PrismaClient();
        await prisma.listing.create({
          data: {
            title,
            description,
            category,
            stock: parseInt(stock),
            price: parseInt(price),
            createdBy: { connect: { id: req.userId } },
            images: fileNames,
          },
        });

        return res.status(201).send("Successfully created the listing.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Occured");
  }
};

export const getUserAuthListing = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { listing: true },
    });
    console.log({ user });
    return res.status(200).json({ listing: user?.listing });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getListingData = async (req, res, next) => {
  try {
    if (req.params.listingId) {
      const prisma = new PrismaClient();
      const listing = await prisma.listing.findUnique({
        where: { id: parseInt(req.params.listingId)}
      });
      return res.status(200).json({ listing });
    }
    return res.status(400).send("ListingId is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editListingData = async (req, res, next) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const { title, description, category, price, stock } = req.query;
        const prisma = new PrismaClient();
        const oldData = await prisma.listing.findUnique({
            where: { id: parseInt(req.params.listingId) }
        })
        await prisma.listing.update({
          where: { id: parseInt(req.params.listingId) },
          data: {
            title,
            description,
            category,
            stock: parseInt(stock),
            price: parseInt(price),
            createdBy: { connect: { id: req.userId } },
            images: fileNames,
          },
        });
        oldData?.images.forEach((image) => {
          if (existsSync(`uploads/${image}`)) unlinkSync(`uploads/${image}`);
        });
        return res.status(200).send("Successfully edited the listing.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Occured");
  }
};
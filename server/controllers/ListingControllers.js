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
        where: { id: parseInt(req.params.listingId) },
        include: {
          reviews: {
            include: {
              reviewer: true,
            },
          },
          createdBy: true,
        },
      });

      const userWithListing = await prisma.user.findUnique({
        where: { id: listing?.createdBy.id },
        include: {
          listing: {
            include: { reviews: true },
          },
        },
      });

      const totalReviews = userWithListing.listing.reduce(
        (acc, listing) => acc + listing.reviews.length,
        0
      );

      const averageRating = (
        userWithListing.listing.reduce(
          (acc, listing) =>
            acc + listing.reviews.reduce((sum, review) => sum + review.rating, 0),
          0
        ) / totalReviews
      ).toFixed(1);


      return res
      .status(200)
      .json({ listing: { ...listing, totalReviews, averageRating } });
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
          where: { id: parseInt(req.params.listingId) },
        });
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

export const searchListing = async (req, res, next) => {
  try {
    if (req.query.searchTerm || req.query.category) {
      const prisma = new PrismaClient();
      const listing2 = await prisma.listing.findMany(
        createSearchQuery(req.query.searchTerm, req.query.category)
      );
      return res.status(200).json({ listing2 });
    }
    return res.status(400).send("Search Term or Category is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR: [],
    },
    include: {
      reviews: {
        include: {
          reviewer: true,
        },
      },
      createdBy: true,
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm, mode: "insensitive" },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category, mode: "insensitive" },
    });
  }
  return query;
};

const checkOrder = async (userId, listingId) => {
  try {
    const prisma = new PrismaClient();
    const hasUserOrderedListing = await prisma.orders.findFirst({
      where: {
        buyerId: parseInt(userId),
        listingId: parseInt(listingId),
        status: parseInt(1),
      },
    });
    return hasUserOrderedListing;
  } catch (err) {
    console.log(err);
  }
};

export const checkListingOrder = async (req, res, next) => {
  try {
    if (req.userId && req.params.listingId) {
      const hasUserOrderedListing = await checkOrder(req.userId, req.params.listingId);
      return res
        .status(200)
        .json({ hasUserOrderedListing: hasUserOrderedListing ? true : false });
    }
    return res.status(400).send("userId and listingId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addReview = async (req, res, next) => {
  try {
    if (req.userId && req.params.listingId) {
      if (await checkOrder(req.userId, req.params.listingId)) {
        if (req.body.reviewText && req.body.rating) {
          const prisma = new PrismaClient();
          const newReview = await prisma.reviews.create({
            data: {
              rating: req.body.rating,
              reviewText: req.body.reviewText,
              reviewer: { connect: { id: parseInt(req?.userId) } },
              listing: { connect: { id: parseInt(req.params.listingId) } },
            },
            include: {
              reviewer: true,
            },
          });
          return res.status(201).json({ newReview });
        }
        return res.status(400).send("ReviewText and Rating are required.");
      }
      return res
        .status(400)
        .send("You need to purchase the listing in order to add review.");
    }
    return res.status(400).send("userId and listingId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
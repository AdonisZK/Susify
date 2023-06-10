import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NHNCKJB6wzGHIxroKEUS1sdV1efkKzxth7n5A5bGTV8Z6cePA7b4mJEOZiBbUKyUe6lLfMb6kdKD1jA0eIT5sc400Ax9VS9lr"
);

export const addOrder = async (req, res, next) => {
  try {
    if (req.body.listingId) {
      const { listingId } = req.body;
      const prisma = new PrismaClient();
      const listing = await prisma.listing.findUnique({
        where: { id: parseInt(listingId) },
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: listing?.price * 1000000,
        currency: "idr",
        payment_method_types: ['card'],
      });
      await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: listing?.price,
          buyer: { connect: { id: req?.userId } },
          listing: { connect: { id: parseInt(listingId) } },
        },
      });
      return res.status(201)
        .json({ clientSecret: paymentIntent.client_secret });;
    } else {
      res.status(400).send("Listing id is required.");
    }
  } catch (err) {
    console.error('Error in addOrder:', err.message, err.stack);
    return res.status(500).send("Internal Server Error");
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    if (req.body.paymentIntent) {
      const prisma = new PrismaClient();
      await prisma.orders.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { status: parseInt(1) },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getBuyerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: { buyerId: req.userId, status: parseInt(1) },
        include: { listing: true,  buyer: true},
        
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
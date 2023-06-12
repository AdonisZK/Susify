import { PrismaClient } from "@prisma/client";

export const getSellerData = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const listing = await prisma.listing.count({ where: { userId: req.userId } });
      const {
        _count: { id: orders },
      } = await prisma.orders.aggregate({
        where: {
          status: parseInt(1),
          listing: {
            createdBy: {
              id: req.userId,
            },
          },
        },
        _count: {
          id: true,
        },
      });
      const unreadMessages = await prisma.message.count({
        where: {
          recipientId: req.userId,
          isRead: false,
        },
      });

      const today = new Date();
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisYear = new Date(today.getFullYear(), 0, 1);

      const {
        _sum: { price: revenue },
      } = await prisma.orders.aggregate({
        where: {
          listing: {
            createdBy: {
              id: req.userId,
            },
          },
          status: parseInt(1),
          createdAt: {
            gte: thisYear,
          },
        },
        _sum: {
          price: true,
        },
      });

      const {
        _sum: { price: dailyRevenue },
      } = await prisma.orders.aggregate({
        where: {
          listing: {
            createdBy: {
              id: req.userId,
            },
          },
          status: parseInt(1),
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: {
          price: true,
        },
      });

      const {
        _sum: { price: monthlyRevenue },
      } = await prisma.orders.aggregate({
        where: {
          listing: {
            createdBy: {
              id: req.userId,
            },
          },
          status: parseInt(1),
          createdAt: {
            gte: thisMonth,
          },
        },
        _sum: {
          price: true,
        },
      });
      return res.status(200).json({
        dashboardData: {
          orders,
          listing,
          unreadMessages,
          dailyRevenue,
          monthlyRevenue,
          revenue,
        },
      });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
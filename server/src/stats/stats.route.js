const express = require('express');
const User = require('../users/user.model');
const Order = require('../orders/orders.model');
const router = express.Router();
const Products = require('../products/products.model');
const Reviews = require('../reviews/reviews.model');
const moment = require('moment');

// user stats by email
router.get('/user-stats/:email', async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email: email });
        if(!user) return res.status(404).send({message: 'user not found'});
        //sum of all orders
        const totalPaymentsResult =await Order.aggregate([
            {$match: {email:email}},
            {$group: {_id: null, totalAmount:{$sum: "$amount"}}}
        ])
        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0


        // get total review
        const totalReviews = await Reviews.countDocuments({ userId: user._id });

        // total purchased products
        const purchasedProductIds = await Order.distinct("products.productId", { email: email });
        const totalPurchasedProducts = purchasedProductIds.length;

        res.status(200).send({
            totalPayments: totalPaymentsAmount.toFixed(2),
            totalReviews,
            totalPurchasedProducts
        });

    } catch (error) {
        console.error("Error fetching user stats", error);
        res.status(500).send({ message: "Failed to fetch user stats" });
    }
});

// Admin stats
router.get('/admin-stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Products.countDocuments();
        const totalReviews = await Reviews.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalEarningsResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$amount" }
                }
            }
        ]);
        const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;
        const monthlyEarningsResult = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    monthlyEarnings: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } } 
        ]);
        const monthlyEarnings = monthlyEarningsResult.map(entry => ({
            month: entry._id.month,
            year: entry._id.year,
            earnings: entry.monthlyEarnings.toFixed(2)
        }));
        res.status(200).json({
            totalOrders,
            totalProducts,
            totalReviews,
            totalUsers,
            totalEarnings,
            monthlyEarnings
        });
    } catch (error) {
        console.error("Error fetching admin stats", error);
        res.status(500).send({ message: 'Failed to fetch admin stats' });
    }
});

router.get('/weekly-stats', async (req, res) => {
    try {
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();

        const weeklyEarningsResult = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lte: endOfWeek }
                }
            },
            {
                $group: {
                    _id: { day: { $dayOfWeek: "$createdAt" } },
                    dailyEarnings: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.day": 1 } } 
        ]);

        const weeklyProductsResult = await Products.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lte: endOfWeek }
                }
            },
            {
                $group: {
                    _id: { day: { $dayOfWeek: "$createdAt" } },
                    dailyProducts: { $sum: 1 }
                }
            },
            { $sort: { "_id.day": 1 } } 
        ]);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weeklyReport = daysOfWeek.map((day, index) => {
            const earnings = weeklyEarningsResult.find(entry => entry._id.day === index + 1)?.dailyEarnings || 0;
            const products = weeklyProductsResult.find(entry => entry._id.day === index + 1)?.dailyProducts || 0;

            return {
                day,
                earnings: earnings.toFixed(2),
                products
            };
        });

        res.status(200).json({
            weeklyReport
        });
    } catch (error) {
        console.error("Error fetching weekly stats", error);
        res.status(500).send({ message: 'Failed to fetch weekly stats' });
    }
});


//* get order weekly stats
router.get('/order-stats', async (req, res) => {
    try {
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();

        // Aggregate daily orders
        const dailyOrdersResult = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
                },
            },
            {
                $group: {
                    _id: { day: { $dayOfWeek: "$createdAt" } },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { "_id.day": 1 } }, // Sort by day of the week
        ]);

        // Map results to days of the week
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dailyOrders = daysOfWeek.map((day, index) => {
            const stats = dailyOrdersResult.find(entry => entry._id.day === index + 1) || { totalOrders: 0 };
            return {
                day,
                totalOrders: stats.totalOrders,
            };
        });

        // Aggregate orders by status
        const ordersByStatusResult = await Order.aggregate([
            {
                $group: {
                    _id: "$status", // Assuming `status` field exists in Order
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { totalOrders: -1 } }, // Sort by totalOrders descending
        ]);

        const ordersByStatus = ordersByStatusResult.map(entry => ({
            status: entry._id,
            totalOrders: entry.totalOrders,
        }));

        res.status(200).json({
            dailyOrders,
            ordersByStatus,
        });
    } catch (error) {
        console.error("Error fetching order stats", error);
        res.status(500).send({ message: 'Failed to fetch order stats' });
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/sales-over-time', async (req, res) => {
    try {
        const { interval } = req.query;
        let groupStage;
        if (interval === 'daily') {
            groupStage = { $dateToString: { format: "%Y-%m-%d", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else if (interval === 'monthly') {
            groupStage = { $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else if (interval === 'quarterly') {
            groupStage = {
                $concat: [
                    { $toString: { $year: { $dateFromString: { dateString: "$created_at" } } } },
                    "-Q",
                    { $toString: { $ceil: { $divide: [{ $month: { $dateFromString: { dateString: "$created_at" } } }, 3] } } }
                ]
            };
        } else if (interval === 'yearly') {
            groupStage = { $dateToString: { format: "%Y", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else {
            return res.status(400).json({ error: "Invalid interval specified" });
        }

        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: groupStage,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        if (salesData.length === 0) {
            return res.status(404).json({ error: "No data found for the specified interval" });
        }

        res.json(salesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/sales-growth-rate', async (req, res) => {
    try {
        const { interval } = req.query;
        let groupStage;

        if (interval === 'daily') {
            groupStage = { $dateToString: { format: "%Y-%m-%d", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else if (interval === 'monthly') {
            groupStage = { $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else if (interval === 'quarterly') {
            groupStage = {
                $concat: [
                    { $toString: { $year: { $dateFromString: { dateString: "$created_at" } } } },
                    "-Q",
                    { $toString: { $ceil: { $divide: [{ $month: { $dateFromString: { dateString: "$created_at" } } }, 3] } } }
                ]
            };
        } else if (interval === 'yearly') {
            groupStage = { $dateToString: { format: "%Y", date: { $dateFromString: { dateString: "$created_at" } } } };
        } else {
            return res.status(400).json({ error: "Invalid interval specified" });
        }


        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: groupStage,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]);


        const growthRates = salesData.map((data, index, arr) => {
            if (index === 0) return { period: data._id, growthRate: null };
            const previousPeriodSales = arr[index - 1].totalSales;
            const currentPeriodSales = data.totalSales;
            const growthRate = ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) * 100;
            return { period: data._id, growthRate: growthRate.toFixed(2) };
        });

        res.json(growthRates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Order = require('../models/Order')


router.get('/new-customers-over-time', async (req, res) => {
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

        const newCustomersData = await Customer.aggregate([
            {
                $group: {
                    _id: groupStage,
                    newCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(newCustomersData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/repeat-customers', async (req, res) => {
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

        const repeatCustomersData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        interval: groupStage,
                        customer_id: "$customer.id"
                    },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    orderCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.interval",
                    repeatCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(repeatCustomersData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/customer-distribution', async (req, res) => {
    try {
      const cityDistribution = await Customer.aggregate([
        {
          $group: {
            _id: "$default_address.city", 
            customerCount: { $sum: 1 } 
          }
        },
        {
          $sort: { customerCount: -1 } 
        }
      ]);
  
      res.json(cityDistribution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.get('/customer-lifetime-value-cohorts', async (req, res) => {
    try {
      const cohortData = await Order.aggregate([
        {
          $lookup: {
            from: "shopifyCustomers",
            localField: "customer.id",
            foreignField: "id",
            as: "customer"
          }
        },
        { $unwind: "$customer" },
        {
          $group: {
            _id: {
              
              cohort:  { $dateToString: { format: "%Y-%m", date: { $dateFromString: { dateString: "$created_at" } } } }, 
              customerId: "$customer.id"
            },
            totalSpent: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } } 
          }
        },
        {
          $group: {
            _id: "$_id.cohort", 
            cohortLifetimeValue: { $sum: "$totalSpent" }, 
            customerCount: { $sum: 1 } 
          }
        },
        { $sort: { _id: 1 } } 
      ]);
  
      res.json(cohortData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;

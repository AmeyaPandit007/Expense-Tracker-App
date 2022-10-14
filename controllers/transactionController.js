const Transaction = require("../models/Transaction");

// @desc Get all Transactions
// @route GET /api/v1/transaction
// @access Public
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add Transaction
// @route POST /api/v1/transaction
// @access Public
const addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const transaction = await Transaction.create(req.body);
      
        return res.status(201).json({
          success: true,
          data: transaction
        });

    } catch (err) {
        // console.log(err.name);
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
              });
        }
    }

};

// @desc Delete Transactions
// @route DELETE /api/v1/transaction/:id
// @access Public
const deleteTransactions = async (req, res, next) => {
//   res.status(200).send("DELETE Transactions.!");
    try 
    {
        const {id} = req.params;

        const transaction = await Transaction.findByIdAndDelete({_id:id});

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }
        if(transaction) {
            return res.status(200).json({
                success: true,
                data: transaction
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransactions,
};

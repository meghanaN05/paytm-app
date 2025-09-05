const router = require('express').Router();
const { Bank,User } = require('../DB/db');
const {authMiddleware} = require('../middleware/middleware.js');
const mongoose = require('mongoose');   

router.get('/balance', authMiddleware, async (req, res) => {
    const id=req.id
    const banks = await Bank.findOne({UserId:id});
    res.json({balance:banks.balance});
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        const account = await Bank.findOne({ UserId: req.id }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Bank.findOne({ UserId: to }).session(session);


        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Bank.updateOne({ UserId: req.id }, { $inc: { balance: -amount } }).session(session);
        await Bank.updateOne({ UserId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;


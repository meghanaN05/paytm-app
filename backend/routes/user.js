const express = require('express');
const router = express.Router();

const app = express()
const zod = require('zod')

const { authMiddleware } = require("../middleware/middleware.js")


const signupSchema = zod.object({
    body: zod.object({
        username: zod.string().min(1, "Username is required"),
        email: zod.string().email("Invalid email format"),
        password: zod.string().min(6, "Password must be at least 6 characters long"),
        firstName: zod.string().min(1, "First name is required"),
        lastName: zod.string().min(1, "Last name is required"),
    })
});






const signinSchema = zod.object({
    body: zod.object({
        email: zod.string().email("Invalid email format"),
        password: zod.string().min(1, "Password is required"),
    })
});

// Middleware for schema validation
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
        });
        // console.log("Received signup request with data:", req.body); // Move this line here
        next();
    } catch (error) {
        return res.status(400).json({ message: error.errors[0].message });
    }

};



const { User,Bank } = require('../DB/db'); // Assuming the user model is exported from db.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = require('../config');
const JWT_SECRET=process.env.JWT_SECRET




// Signup Route
router.post('/signup', validate(signupSchema), async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, username, firstName, lastName });
        const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: "1h" });
        const bank = await Bank.create({ UserId: result._id,  balance: 1+Math.random()*10000 });
        res.status(200).json({ message: "User signed up successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.errors[0].message });
    }
});

// Signin Route
router.post('/signin', validate(signinSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User signed in successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.errors[0].message });
    }
});

const updateSchema = zod.object({
    body: zod.object({
        password: zod.string().min(6, "Password must be at least 6 characters long").optional(),
        firstName: zod.string().min(1, "First name is required").optional(),
        lastName: zod.string().min(1, "Last name is required").optional(),
    })
})


router.put('/update', authMiddleware, validate(updateSchema), async (req, res) => {
    const { id } = req; // Assuming id is set by authMiddleware
    let updates = req.body;

    // Check if password is part of the updates and hash it if present
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 12);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user" });
    }
});



router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter;
    try {
        let query = {};
        if (filter) {
            query = {
                $or: [
                    { firstName: { $regex: filter, $options: 'i' } },
                    { lastName: { $regex: filter, $options: 'i' } },
                  
                ]
            };
        }
        const users = await User.find(query, 'firstName lastName _id username');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users" });
    }
});

router.get("/me",authMiddleware,async(req,res)=>{
    const {id} = req;
    try {
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message:"Failed to retrieve user"});
    }
})

module.exports = router


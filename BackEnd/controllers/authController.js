const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exist with this email...'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name, email, password: hashedPassword});
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = 
            `Welcome to ShopNest, ${name}!, Thank you for registering with us...
            Your OTP for ShopNest Registration is ${otp}`;

            await sendEmail(email, 'Welcome to ShopNest - Your OTP for Registration...', message);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }else {
            res.status(400).json({message: "User data is Invalid..."});
        }
        // await newUser.save();
        // res.status(201).json({message: 'User registered successfully...'});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error...'});
        console.log(error);
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
         // Fixes Error 1: Check if user exists BEFORE running bcrypt.compare
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Fixes Error 1: Ensures both arguments are valid strings
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }else {
            res.status(401).json({ message: 'Invalid credentials...' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error...' });
        console.log(error);
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error...' });
        console.log(error);
    }
};


module.exports = { registerUser, loginUser, getUsers };
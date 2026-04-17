import express from 'express';
import User from '../modules/userM.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isMasterAdmin } from '../middleware/isMasterAdmin.js';

const router = express.Router();

//post api for register user
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
       const user = await User.findOne({ email });
       if (user) {
        return res.status(400).json({ message: 'User already exists' });
       }
       if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
       });
       await newUser.save();
       res.status(201).json({success:false, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//post api for login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false , message: 'Invalid credentials' });
        }
        if (password.length < 8) {
            return res.status(400).json({success:false, message: 'Password must be at least 8 characters' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:false ,message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({success: true, token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        res.status(500).json({success:false, message: 'Server error' });
    }
});




export default router;
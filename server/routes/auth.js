// server/routes/auth.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, generateToken } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const User = require('../models/User');

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register',
    validate({
        body: {
            email: { required: true, type: 'email' },
            password: { required: true, minLength: 6 },
            name: { required: true, minLength: 2 },
            role: { enum: ['admin', 'manager', 'driver'] }
        }
    }),
    asyncHandler(async (req, res) => {
        const { email, password, name, role = 'driver', phone } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        const user = await User.create({
            email: email.toLowerCase(),
            password,
            name,
            role,
            phone
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            data: {
                user: user.toPublicJSON(),
                token
            }
        });
    })
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login',
    validate({
        body: {
            email: { required: true, type: 'email' },
            password: { required: true }
        }
    }),
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Find user with password
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is deactivated. Contact admin.'
            });
        }

        // Generate token
        const token = generateToken(user);

        res.json({
            success: true,
            data: {
                user: user.toPublicJSON(),
                token
            }
        });
    })
);

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticate, asyncHandler(async (req, res) => {
    if (!req.user || typeof req.user.toPublicJSON !== 'function') {
        console.error('Authenticated user missing toPublicJSON:', req.user && req.user._id);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json({
        success: true,
        data: req.user.toPublicJSON()
    });
}));

/**
 * PUT /api/auth/me
 * Update current user profile
 */
router.put('/me', authenticate, asyncHandler(async (req, res) => {
    const { name, phone, avatar } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(
        req.user && req.user._id ? req.user._id : null,
        updates,
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
        success: true,
        data: user.toPublicJSON()
    });
}));

/**
 * PUT /api/auth/password
 * Change password
 */
router.put('/password',
    authenticate,
    validate({
        body: {
            currentPassword: { required: true },
            newPassword: { required: true, minLength: 6 }
        }
    }),
    asyncHandler(async (req, res) => {
        const { currentPassword, newPassword } = req.body;

        // Get user with password
        const user = await User.findById(req.user && req.user._id ? req.user._id : null).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    })
);

module.exports = router;

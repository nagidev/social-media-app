const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv/config')

const auth = require('../middleware/auth')

const User = require('../models/User')

// GET /
// Get list of users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({}).select('-password')

        if (!users) {
            return res.status(400).json({ errors: [{ msg: 'No data.' }] })
        }

        res.json({ users })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error.')
    }
})

// GET /:id
// Get user data by id
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] })
        }

        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error.')
    }
})

// POST /
// Register new user
router.post('/',
    [
        check('username', 'Please provide a username.').notEmpty(),
        check('password', 'Password must be 6 character or more.').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body

        try {
            // Check if user already registered
            let user = await User.findOne({ username })
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'Username taken.' }] })
            }

            // Create new user
            user = new User({ username, password })

            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)

            // Save to DB
            await user.save()

            // Return JSON Web Token
            jwt.sign(
                { user: { id: user.id } },
                process.env.JWT_KEY,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error.')
        }
    })

// DELETE /
// Delete user account
router.delete('/', auth, async (req, res) => {
    try {
        const user = User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        await User.findByIdAndDelete(req.user.id)
        res.send('User deleted.')
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(500).send('Server error.')
    }
})

module.exports = router
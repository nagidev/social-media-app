const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv/config')

const auth = require('../middleware/auth')

const User = require('../models/User')

// GET /
// Get user data from token
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] })
        }

        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error.')
    }
})

// POST : login user
router.post('/',
    [
        check('username', 'Username is required.').notEmpty(),
        check('password', 'Password is required.').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body

        try {
            // Find user
            const user = await User.findOne({ username })

            // Check if user exists
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] })
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] })
            }

            // Return token
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

module.exports = router
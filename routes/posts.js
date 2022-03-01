const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth')

const User = require('../models/User')
const Post = require('../models/Post')

// POST /
// Create a post
router.post('/',
    [
        auth,
        [
            check('text', 'Provide text for the post').notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            // Check if user exists
            const user = await User.findById(req.user.id).select('-password')
            if (!user) {
                return res.status(401).json({ errors: [{ msg: 'Unauthorized.' }] })
            }

            // Create new post
            const post = new Post({
                user: req.user.id,
                text: req.body.text,
                name: user.username
            })

            // Save to DB
            await post.save()

            // Return post
            res.json(post)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error.')
        }
    })

// GET /
// Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ date: -1 })

        if (!posts) {
            return res.status(404).json({ msg: 'Posts not found' })
        }

        res.json(posts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error.')
    }
})

// GET /:id
// Get post by id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(post)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error.')
    }
})

// DELETE /:id
// Delete post by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        } else if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorised.' })
        }

        await post.remove()
        res.send('Post deleted.')
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error.')
    }
})

// PUT /like/:id
// Like/unlike a post
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            // Add like
            post.likes.unshift({ user: req.user.id })
        } else {
            // Remove like
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
        }

        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error.')
    }
})

module.exports = router
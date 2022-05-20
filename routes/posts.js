const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public/images/' })

const auth = require('../middleware/auth')

const User = require('../models/User')
const Post = require('../models/Post')

// POST api/posts/
// Create a post
router.post('/',
    [
        auth,
        upload.single('file'),
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
                username: user.username
            })

            // Add file
            if (req.file) {
                post.filePath = req.file.destination + req.file.filename
            }

            // Save to DB
            await post.save()

            // Return post
            res.json(post)
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error.')
        }
    })

// GET api/posts/
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

// GET api/posts/:id
// Get post by id
router.get('/id/:id', auth, async (req, res) => {
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

// GET api/posts/:username
// Get posts by username
router.get('/:username', auth, async (req, res) => {
    try {
        const posts = await Post.find({username: req.params.username}).sort({ date: -1 })

        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(posts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error.')
    }
})

// DELETE api/posts/:id
// Delete post by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        } else if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorised.' })
        }

        // delete image file if exists
        if (post.filePath) {
            fs.unlink(post.filePath, (err) => {
                if (err) {
                    console.log('Unlink of file failed : ', err)
                }
            })
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

// PUT api/posts/like/:id
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

// PUT api/posts/comment/:id
// Comment on a post
router.put('/comment/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Add comment
        const comment = { user: req.user.id, username: req.user.username, text: req.body.text }
        post.comments.push(comment)

        await post.save()
        res.json(post.comments)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error.')
    }
})

// PUT api/posts/comment/:id/del/:cid
// Remove a comment on a post
router.put('/comment/:id/del/:cid', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        // Remove comment
        const removeIndex = post.comments.indexOf(req.params.cid)
        post.comments.splice(removeIndex, 1)

        await post.save()
        res.json(post.comments)
    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error.')
    }
})

module.exports = router
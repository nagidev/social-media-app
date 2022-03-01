const jwt = require('jsonwebtoken')

require('dotenv/config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Not authorised! No token provided!' }] })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ errors: [{ msg: 'Invalid token.' }] })
    }
}
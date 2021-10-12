const express = require("express")
const crypto = require('crypto')
const cors = require("cors")

const captions = require("./captions")

const app = express()
const port = process.env.port || 3001

// TODO : posts
const posts = [
    {
        username: 'Baabra',
        title: 'Love my new baa-kini',
        image: 'public/post0.jpg'
    },
    {
        username: 'Ewestice',
        title: 'Wool wool wool',
        image: 'public/post1.jpg'
    },
    {
        username: 'Britany Shears',
        title: 'Baby don\'t herd me',
        image: 'public/post2.jpg'
    },
    {
        username: 'Wool Smith',
        title: 'Shear up guys!',
        image: 'public/post3.jpg'
    }
]

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.send("<h1>Server</h1>")
})

app.get('/getRandomCaption', (req, res) => {
    if ( req.query.data === '2a9a515c5d794b81e8392fbcc9ec0def' ) {
        res.json(captions.getRandomCaption())
    } else {
        res.status(404).end()
    }
})

app.get('/loginUser', (req, res) => {
    const data  = JSON.parse(req.query.data)
    console.log('Received login request...')
    console.log(data)
    // TODO : check database for user credentials
    const validUser = data.username === 'sheep'
    const validPassword = data.password === '2a9a515c5d794b81e8392fbcc9ec0def'
    if ( validUser && validPassword ) {
        console.log('Suceeded to authenticate.')
        res.send(crypto.createHash('md5').update(data.username).digest('hex'))
    } else {
        console.log('Failed to authenticate.')
        return res.status(400).json({ validUser: validUser, validPassword: validPassword })
    }
})

app.get('/timeline', (req, res) => {
    const data = req.query.data
    // TODO : generate timeline for user
    if (data === crypto.createHash('md5').update('sheep').digest('hex'))
        res.json(posts)
    else
        res.status(404).end()
})

app.get('/image')

app.listen(port, () => console.log(`Listening at port ${port}`))

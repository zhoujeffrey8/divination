const express = require('express')
const bodyParser = require('body-parser')
const router = express().use(bodyParser.json())
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const User = require('../models/user')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

router.use(cors())
router.use(express.json())

mongoose.connect(process.env.DATABASE_URL)

router.post('/complete', async (req, res) => {
    // do something
    let needsComplete = req.body.string

    const newUser = new User({
        name: "Jeff"
    })

    try {
        await newUser.save()
    } catch {
        console.log("Error creating user")
    }
    // url = ""
    // settings = {}
    // const resp = await fetch(url, settings)
    // url and settings are both variables
    //       .then(response => response.json())

    // resp is the object that is sent to the server
    // return it as a response
    const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    console.log(needsComplete)
    const response = await openai.createCompletion("text-davinci-001", {
        prompt: `Complete this sentence: ${needsComplete} `,
        max_tokens: 100,
    });

    // console.log(response)
    // console.log(response.data.choices)

    let newString = ""

    for (const responseText of response.data.choices) {
        newString = newString.concat(responseText.text)
    }
    // console.log(newString)

    return res.json({
        newString: newString
    })
})

router.post("/question", async (req, res) => {
    let question = req.body.string

    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createCompletion("text-davinci-001", {
        prompt: `${question}`,
        max_tokens: 100,
    })

    let newString = ""

    // add the text objects into one string
    for (const responseText of response.data.choices) {
        newString = newString.concat(responseText.text)
    }
    // console.log(newString)

    return res.json({
        newString: newString
    })
})

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
})


router.post("/users/register", async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log("STATUS")
		res.json({ status: 'ok' })
    } catch(err) {
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    }
})


router.post("/users/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(user) {
        const token = jwt.sign({
            name:user.name,
            email: user.email
        }, 'AF2R-HB7W-7THA-KERC'
        )
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'ok', user: false})
    }
    }
    
)


router.get("/users/getName", async(req, res) => {
        const token = req.headers["x-access-token"]
        try {
        const decoded = jwt.verify(token, 'AF2R-HB7W-7THA-KERC')
        const email = decoded.email
        const user = await User.updateOne({email: email}, {$set: {name: req.body}})
        return res.json({status: 'ok', name: user.name})
    } catch(error) {
        res.json({status: 'error', error: 'invalid token'})
    }
        
})


module.exports = router
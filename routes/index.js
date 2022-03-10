const express = require('express')
const bodyParser = require('body-parser')
const router = express().use(bodyParser.json())
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

router.post('/complete', async (req, res) => {
    // do something
    let needsComplete = req.body.string
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
    console.log(response.data.choices)

    let newString = ""

    for (const responseText in response.data.choices) {
        newString.concat(responseText.text)
    }

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

    for (const responseText in response.data.choices) {
        newString.concat(responseText.text)
    }

    return res.json({
        newString: newString
    })
})

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
})

module.exports = router
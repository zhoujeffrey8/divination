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

    // resp is the object that is returned
    // return it as a response
    const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion("text-davinci-001", {
        prompt: `${needsComplete} `,
        max_tokens: 100,
    });

    // console.log(response)
    console.log(response.data.choices)

    return res.json({newString: response.data.choices[0].text})
})

router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


router.get('/', async (req, res) => {
    // render a template
    // return some version of that
})

module.exports = router
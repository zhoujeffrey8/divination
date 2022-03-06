const express = require('express')
const bodyParser = require('body-parser')
const router = express().use(bodyParser.json())
const { Configuration, OpenAIApi } = require("openai");


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
    apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion("text-davinci-001", {
        prompt: `Complete the sentence: ${needsComplete} `,
        max_tokens: 100,
    });

    // console.log(response)
    console.log(response.data.choices)

    return res.json({newString: response.data.choices[0].text})
})


router.get('/', async (req, res) => {
    // render a template
    // return some version of that
})

module.exports = router


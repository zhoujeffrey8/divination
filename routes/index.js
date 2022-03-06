const express = require('express')
const bodyParser = require('body-parser')
const router = express().use(bodyParser.json())


router.post('/', async (req, res) => {
    // do something
    console.log(req.body)
    // url = ""
    // settings = {}
    // const resp = await fetch(url, settings)
    // url and settings are both variables
    //       .then(response => response.json())

    // resp is the object that is returned
    // return it as a response
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion("text-davinci-001", {
    prompt: "",
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    });


    return res.json({newString: "YAY"})
})

router.get('/', async (req, res) => {
    // render a template
    // return some version of that
})

module.exports = router


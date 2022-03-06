const express = require('express')
const bodyParser = require('body-parser')
const router = express().use(bodyParser.json())


router.post('/', async (req, res) => {
    // do something
    console.log(req.body)
    url = ""
    settings = {}
    // const resp = await fetch(url, settings)
    // url and settings are both variables
    //       .then(response => response.json())

    // resp is the object that is returned
    // return it as a response
    return res.json({newString: "YAY"})
})

router.get('/', async (req, res) => {
    // render a template
    // return some version of that
})

module.exports = router


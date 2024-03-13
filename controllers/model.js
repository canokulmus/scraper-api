"use strict";
// const Scra = require('../models/product')
const Scrapped = require('../models/scrapped')
require("dotenv").config();

const runPythonScraper = require("./runner");
module.exports = {

    runScraper: async(req, res, next) => {

        // console.log(req.body)
        
        runPythonScraper()
            .then(output => {
                console.log(output)
                res.json({
                    code: 200,
                    data:  output,
                });
            })
    },

    getScrapedData: async(req, res, next) => {

        const data = await Scrapped.find()
        

        console.log('done', data)
        res.json({
            code: 200,
            data:  data,
        });
    },

    runEx: async(req, res, next) => {
        runPythonScraper(5,6)
            .then(output => {
                res.json({
                    code: 200,
                    data:  JSON.parse(output),
                });
            })
    },
}
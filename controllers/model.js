"use strict";
// const Scra = require('../models/product')
const Scrapped = require('../models/scrapped')
require("dotenv").config();

const runPythonScraper = require("./runner");
module.exports = {

    runScraper: async(req, res, next) => {

        const { searchString } = req.body;
        
        let keywordsArr = searchString.split(",");

        keywordsArr = keywordsArr.map(keyword => keyword.trim());

        runPythonScraper(`'${JSON.stringify(keywordsArr)}'`)
            .then(output => {
                res.json({
                    code: 200,
                    data:  output,
                });
            })
    },

    getScrapedData: async(req, res, next) => {

        const data = await Scrapped.find()
        
        res.json({
            code: 200,
            data:  data,
        });
    },
}
"use strict"

const mongoose = require('mongoose');

const stringToObjectId = st => {
    return mongoose.Types.ObjectId(st)
}

module.exports = { stringToObjectId }
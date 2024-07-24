
const mongoose = require('mongoose');

let connectdb = async (url) =>{
    return mongoose.connect(url)
}

module.exports = connectdb


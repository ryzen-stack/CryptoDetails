const mongoose = require('mongoose');

let coinSchema = new mongoose.Schema({
    symbol:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    current_price:{
        type:Number,
        required:true
    },
    market_cap:{
        type:Number,
        required:true
    },
    market_cap_rank:{
        type:Number,
        required:true
    },
    price_change_24h:{
        type:Number,
        required:true
    },
    price_change_percentage_24h:{
        type:Number,
        required:true
    },
    circulating_supply:{
        type:Number,
        required:true
    },
    circulating_supply:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('CoinCollection',coinSchema)
const fs = require('fs');
const coins = require('../models/coins.model');
const users = require('../models/user.model');

let Allcoins = async (req,res,next) =>{
    try {
        // let readFile = fs.readFileSync('./coins.js',"utf-8")
        // let filteredData = JSON.parse(readFile).map(item=>({
        //     symbol: item.symbol,
        //     name: item.name.toLowerCase(), 
        //     image: item.image,
        //     current_price: item.current_price,
        //     market_cap: item.market_cap,
        //     market_cap_rank: item.market_cap_rank,
        //     price_change_24h:item.price_change_24h,
        //     price_change_percentage_24h:item.price_change_percentage_24h,
        //     circulating_supply:item.circulating_supply,
        //     total_supply:item.total_supply
        // }))
        // let addCoins = await coins.create(filteredData)
        let {email} = (req.user)
        
        let {page,limit} = req.query
        
        page = page || 1;
        limit = limit || 20;
        let skip = (page -1)*limit;
        let data = await coins.find().sort({market_cap_rank:1}).skip(skip).limit(limit)
        res.status(201).json({error:false,message:"All coins sented",data})
    } catch (err) {
        next(err)
    }
 
}

let Searchcoins = async (req,res,next) =>{
    try {
        let {name,symbol,fields,sort,page,limit} = req.query
        let queryObj = {}
        if(name){
            queryObj.name = name

        }
        if(symbol){
            queryObj.symbol = symbol
        }

        if(fields){
            let selectedFields = fields.split(',').join(' ')+ " -_id"
            fields = selectedFields
        }
        let products = coins.find({$or:[{name:queryObj.name},{symbol:queryObj.symbol}]}).select(fields)
       
        if(sort){
            products = products.sort(sort)
        }

        page = page || 1;
        limit = limit || 10
        let skip = (page - 1) * limit

        products =  await products.skip(skip).limit(limit)
        if(products.length){
            return res.status(201).json({error:false,message:"Searched succeed",data:products})
        }
        else{
            return res.status(201).json({error:false,message:"crypto did not found"})
        }
        
    } catch (err) {
        next(err)
        
    }
 
}

module.exports = {Allcoins,Searchcoins} 


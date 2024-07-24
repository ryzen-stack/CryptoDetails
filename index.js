const express = require('express');
require('dotenv').config();
const connectdb = require('./db/connect');
const UserRouter = require('./routes/user.routes');
const coinsRouter = require('./routes/coins.routes');
const cors = require('cors');

let app = express()

app.use(express.json())

app.use(cors())

app.use('/api/v1/users',UserRouter)

app.use('/api/v1/coins',coinsRouter)


app.all('*',(req,res,)=>{
    res.status(404).json({error:true,message:"page not found"})
})

app.use((err,req,res,next)=>{
    res.status(500).json({error:true,message:err.message})
})

let startserver = async () =>{
    await connectdb(process.env.LOCAL_URL)
    console.log('database connected ')
    app.listen(process.env.PORT,()=>{
        console.log(`server at ${process.env.PORT}`)
    })
}
startserver()

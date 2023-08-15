const express =require('express')
const mongoose =require('mongoose')
const userRouter=require('./routes/routes')
const app=express()
const Port=4000
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/LikeImage");
mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})

app.use('/',userRouter)

app.listen(Port,()=>console.log("4000 running"))
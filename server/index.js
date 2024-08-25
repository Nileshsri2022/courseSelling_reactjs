const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const adminRouter=require('./routes/admin.js')
const userRouter=require('./routes/user.js')

const app=express()
app.use(cors())
// to paas post req
app.use(express.json())

app.use('/admin',adminRouter)
app.use('/user',userRouter)

mongoose.connect('mongodb+srv://nilesh:1234@cluster0.rqe7wao.mongodb.net',{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
const port=3000
app.listen(port,()=>{
  console.log("app is listening in port "+port)
})
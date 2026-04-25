import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Data } from "./models/Data.js"
import { User } from "./models/User.js"
import mongoose from "mongoose"

let collection = await mongoose.connect("mongodb://localhost:27017/Passwords")

const app = express()
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  
  })
  
app.post('/send', async(req, res) => {
      console.log("yes")
      //   console.log(req.body)
      let obj = {site: req.body.site, username: req.body.username, password: req.body.password, e_mail: req.body.e_mail}
      new Data(obj).save()
      
      res.send("sigma")
})
app.post('/rece', async(req, res) => {
    const docs = await Data.find({e_mail: req.body.e_mail})
    console.log(docs)
    res.send(docs)
})
app.post('/dele', async(req, res) => {
    // const docs = await Data.find()
    // console.log(docs)
    console.log(req.body)
    await Data.deleteOne({_id: req.body.id})
    res.send("Yessss")
})
app.post('/deleall', async(req, res) => {
    // const docs = await Data.find()
    // console.log(docs)
    await Data.deleteMany({e_mail: req.body.e_mail})
    res.send("Yessss")
})

app.post('/signin', async(req, res)=>{
  let temp = req.body
  let obj = {email: temp.email, password: temp.password}
  if(obj.email=="" || obj.password==""){
    res.send("Fill the all field to continue.")
  }
  let check = await User.findOne({email: obj.email})
  if(!check){
    res.send("There is no any account on this email")
  }
  else{
    if(check.password != temp.password){
      res.send("Incorrect password")
    }
    else{
      res.send("1")
    }
  }
})
app.post('/signup', async(req, res)=>{
  let temp = req.body
  let obj = {email: temp.email, password: temp.password}
  if(obj.email=="" || obj.password=="" || req.body.confirm_password==""){
    res.send("Fill the all field to continue.")
  }
  else if(obj.password!=req.body.confirm_password){
    res.send("Confirm password is different")
  }
  else{
    const check = await User.findOne({email: obj.email})
    if(!check){
      new User(obj).save()
      res.send("1")
    }
    else res.send("User already exist")
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
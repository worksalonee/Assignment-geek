import express from "express"
import cors from  "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { dbConnect } from "./dbConnection/db.js"
import { get,add } from "./Controller/StudentController.js"

const app = express()


//dotenv configuration
dotenv.config()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("dev"))


//Test API
app.get("/",(req,res)=>{
    res.send({message:"hello"})
})
//get and post
app.get("/get",get)
app.post("/add",add)

//listen
const PORT =  process.env.PORT || 8080
const hostName="127.0.0.1"
app.listen(PORT,hostName,()=>{
    console.log(`server running at http://${hostName}:${PORT}`)
    dbConnect()
})
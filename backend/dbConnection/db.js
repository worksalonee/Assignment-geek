import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const url = process.env.URL

export const dbConnect = async()=>{
    try{
       const data = await mongoose.connect(url)
        console.log('database connected')
    }
    catch(err){
        console.log("something went wrong",err)
    }


}

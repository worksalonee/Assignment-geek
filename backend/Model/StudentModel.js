import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        
    },
    courses:{
        type:String,
        
    }
})

 const StudentModel=new mongoose.model("student",studentSchema)

export default StudentModel
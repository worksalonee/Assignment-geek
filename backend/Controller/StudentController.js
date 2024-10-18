import  StudentModel  from "../Model/StudentModel.js";

//ADD student
export const add = async(req,res) =>{
    try {
        const data = req.body
        const newStudent = new StudentModel(data);
        await newStudent.save();
        res.status(200).json({message:"Student details Added"})
        console.log("Added");
          
    } catch (error) {
        res.status(500).send({error:"Details NOt Added"});
        console.log("Something went Wrong",error);
        
        
    }
}
//GET data

export const get= async(req,res)=>{
    try {
        const data= await StudentModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({error:"Details Not Found"});
        console.log("Something went Wrong",err);
    }
}
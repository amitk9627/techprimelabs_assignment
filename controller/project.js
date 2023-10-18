const Projects = require('../model/project.js');

const getDash=async (req,res)=>{

    const alldata=await Projects.find({});
  
    res.json({
        alldata,
    })


}
const getProject = async (req, res) => {
    const totalCount=await Projects.find({}).count();
    const allprojects = await Projects.find({});
    res.json({
        status: true,
        totalCount,
        allprojects,
    })
}

const createProject = async (req, res) => {

    const { projectName, reason, type, category, priority, department, startDate, endDate, location, status } = req.body;
    if (!projectName || !reason || !type || !category || !priority || !department || !startDate || !endDate || !location || !status) {
        return res.status(403).json({
            status: false,
            message: "invalid data"
        })
    }

    try {
        const project = {
            projectName: projectName,
            reason: reason,
            type: type,
            category: category,
            priority: priority,
            department: department,
            startDate: startDate,
            endDate: endDate,
            location: location,
            status: status,
        }
        const newProject = new Projects(project);
        const result = await newProject.save();
        res.json({
            status: true,
            result
        })
    } catch (e) {
        res.status(404).json({
            status: true,
            message: " New project not created"
        })
    }
}
const editProject= async (req,res)=>{
    const{ projectId,str}=req.body;
    try{
        await Projects.findByIdAndUpdate(projectId,{status:str});
        res.json({
        status:true,
       
    })
    }catch(e){
        res.status(404).json({
            status:false
        })
    }
    

}
module.exports = {
    getProject, createProject,editProject,getDash
}
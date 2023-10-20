const { response } = require('express');
const Projects = require('../model/project.js');

const getDash = async (req, res) => {
    try {
        const alldata = await Projects.find({});
        const totalProject = alldata.length;
        const totalClosedIds = alldata.filter((project) => project.status === "Close").length;
        const totalRunningIds = alldata.filter((project) => project.status === "Running").length;
        const totalCancelIds = alldata.filter((project) => project.status === "Cancelled").length;
        const closerIds = alldata.filter(
            (project) => project.status === "Running" && new Date(project.endDate) < new Date()
        ).length;
        res.json({
            totalProject,
            totalClosedIds,
            totalRunningIds,
            totalCancelIds,
            closerIds
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to calculate project statistics" });
    }

}
const getProject = async (req, res) => {
    const totalCount = await Projects.find({}).count();
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
const editProject = async (req, res) => {
    const { projectId, str } = req.body;
    try {
        await Projects.findByIdAndUpdate(projectId, { status: str });
        res.json({
            status: true,

        })
    } catch (e) {
        res.status(404).json({
            status: false
        })
    }


}
const sortProject = async (req, res) => {
    const field = req.body;

    const allProject = await Projects.find({}).sort(field);
    res.status(200).json({
        allProject
    })

}
const dashDepartment = async (req, res) => {
    try {
        const departmentData = await Projects.aggregate([
            {
                $group: {
                    _id: "$department",
                    totalData: { $sum: 1 }, // Calculate total data for each department
                    totalClosed: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Close"] }, 1, 0], // Calculate total closed data for each department
                        },
                    },
                },
            },
        ]);

        res.json(departmentData);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Error fetching department data",
                error: error.message,
            });
    }
}
module.exports = {
    getProject, createProject, editProject, getDash, sortProject, dashDepartment
}
const express=require('express');
const router= express.Router();
const {getProject,createProject,editProject,getDash} =require('../controller/project.js');

router.get('/getProject',getProject );
router.get('/dash',getDash);
router.patch('/getProject/:projectId',editProject);
router.post('/create', createProject);

module.exports=router;
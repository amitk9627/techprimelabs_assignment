const express=require('express');
const router= express.Router();
const {getProject,createProject} =require('../controller/project.js');

router.get('/getProject',getProject );
router.post('/create', createProject);

module.exports=router;
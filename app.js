const express=require('express');
const app=express();
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authMiddleWare=require('./AuthMiddleWare/auth.js');

const usersRoutes=require('./routes/users.js');
const projectRoutes=require('./routes/project.js');

app.use('/user',usersRoutes);
app.use('/project', projectRoutes);



module.exports=app;
const express=require('express');
const app=express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const authMiddleWare=require('./AuthMiddleWare/auth.js');

const usersRoutes=require('./routes/users.js');

app.use('/user',usersRoutes);

module.exports=app;
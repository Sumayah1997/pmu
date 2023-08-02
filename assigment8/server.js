const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 3000;

//user file in the public folder
app.use(express.static(path.join(__dirname,'assigment8')));
//route for home 
app.get('/home',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','fristpage.html'))});
//route for product
app.get('/product',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','allproduct11.html'))}); 
//route for about us
app.get('/reviws',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','revwiespage1.html'))});

app.get('/search',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','seach.html'))});

app.get('/log',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','login.html',))});

app.get('/reg',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','register.html'))});

app.get('/loctiona',(req,res)=>
{res.sendFile(path.join(__dirname,'assigment8','location.html'))});
//start the server
app.listen(PORT,()=>
{console.log(`Server is runnign on http://localhost:${PORT}`);});
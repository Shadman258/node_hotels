const express = require('express')
const app = express();
const db = require('./db');
const person=require('./models/person');
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.get('/', function (req, res) {
    res.send('Welcome to my World...How i can help you?')
  })
 app.post('/persons',async (req,res)=>{

  try{
        const data= req.body
        const newperson=new person(data);
        const  response=await newperson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Eroor'});
    }
 })
 app.get('/persons',async(req,res)=>{
    try{
        const data=await person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Eroor'});
    }
 })
 app.get('/persons/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='manager'||workType=='waiter'){
        const response=await person.find({work:workType});
        console.log('reponse fetched successfully');
        res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Eroor'});
    }
 })
  
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

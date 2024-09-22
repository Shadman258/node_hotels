const express=require('express');
const router=expres.Router();
const person=require('./../models/person');
router.post('/',async (req,res)=>{

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
   router.get('/',async(req,res)=>{
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
   router.get('/:workType',async(req,res)=>{
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
   router.put('./:id',async(req,res)=>{
     try{
        const personId=req.params.id;
        const updatepersondata=req.body;
        const response=await person.findByIdAndUpdate(personId,updatepersondata,{
            new:true,
            runValidators:true,
        });
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        consologe.log('data updated');
        res.status(200).json(response);
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Eroor'});
    }
   })
   router.delete('./:id',async(req,res)=>{
    try{
       const personId=req.params.id;
       const response=await person.findByIdAndDelete(personId);
       if(!response){
           return res.status(404).json({error:'person not found'});
       }
       consologe.log('data deleted');
       res.status(200).json({message:'deleted successfully'});
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Eroor'});
   }
  })
   module.exports= router;
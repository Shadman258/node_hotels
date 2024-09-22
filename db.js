const mongoose=require('mongoose');
const mongoURL='mongodb://localhost:27017/crud'
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('mongoDB connected');
});
db.on('error',(err)=>{
    console.log('mongoDB disconnected');
});
db.on('disconnected',()=>{
    console.log('mongoDB disconnected');
}); 
module.exports=db;
// connection to mongo db 
const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewParser:true}).then(()=>{
    console.log("connected to mongodb sucessfully");
}).catch((e)=>{
    console.log("error while connecting to mongodb");
    console.log(e);
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports={
    mongoose
};
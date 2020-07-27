const express=require('express')();
const app=express;

const mongoose=require('./db/mongoose');

const bodyParser=require('body-parser');

const { List,Task } = require('./db/modules');


app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/lists',(req,res)=>{
//    show the list
    List.find({}).then((lists)=>{
        res.send(lists);
    }).catch((e)=>{
        res.send(e);
    });
})

app.post('/lists',(req,res)=>{
    // return new lsit
    let title=req.body.title;
    
    let newlist=new List({
        title
    });
    newlist.save().then((listDoc)=>{
        //b4 list doc i returen
        res.send(listDoc);
    })
});

app.delete('/lists/:id',(req,res)=>{
//    dlelte the list
    List.findOneAndRemove({
        _id:req.params.id
        })    .then((removedlistDoc)=>{
                res.send(removedlistDoc);

            });
    
});

app.patch('/lists/:id',(req,res)=>{
    // update the specified lsit
    List.findOneAndUpdate({_id:req.params.id},{
        $set:req.body
    }).then(()=>{
        // res.sendStatus(200);
        res.send({' message': 'list Updated Successfully' });
    })
});


app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});


// app.get('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOne({
//         _taskId: req.params.taskId,
//         _listId: req.params.listId
//     }).then((task) => {
//         res.send(task);
//     })
// });



app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({ message: "Task Updated Successfully" });
        // res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.sendStatus(removedTaskDoc);
    })
});

app.listen(3000,()=>{
    console.log(":listning on port 3000");
})
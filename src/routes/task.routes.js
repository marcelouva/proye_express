const express = require('express');
const router = express.Router();
const Task = require('../models/task');


//abajo defino los endpoints

//listar las tareas
router.get('/', async (req,res)=>{
    const tasks= await Task.find();
    console.log(tasks);
    res.json(tasks);

});



//buscar una tarea
router.get('/:id', async (req,res)=>{
    const task= await Task.findById(req.params.id);
    console.log(task);
    res.json(tasks);

});


//alta
router.post('/', async(req,res)=>{
    console.log(req.body);
   const {title,description} = req.body;
    const task = new Task({title,description});
    console.log(task);
    await task.save();
    res.json({status: 'Tarea guardada'});
});

//modifiacoin
router.put('/:id',async (req,res)=>{
    const {title, description} = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    res.json({status: 'Tarea actualizada.'});

});

//baja
router.delete('/:id',async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id,newTask);
    req.json({status: 'Tarea eliminada.'});

});


//router.get('/plantilla',async  (req, res) => {
  //  console.log(__dirname);
    //res.render('index'); // Renderiza la vista 'index.ejs'
//});



router.get('/', async (req,res)=>{
        res.render('index'); // Renderiza la vista 'index.ejs'

});



module.exports = router;
const express = require('express');
const session = require('express-session');

const router = express.Router();
const User = require('../models/user');

const requireLogin = require('../helpers/utils');

//const requireLogin = require('../helpers/utils');
//import { requireLogin } from '../helpers/utils';



router.get('/ruta', requireLogin, (req, res) => {
  res.send('¡Bienvenido a la ruta protegida de tareas!');
});






//listar las tareas
router.get('/', requireLogin, async (req,res)=>{
    const users= await User.find();
    console.log(users);
    res.json(users);

});


//buscar una tarea
/*router.get('/:id', async (req,res)=>{
    const task= await User.findById(req.params.id);
    console.log(task);
    res.json(tasks);

});
*/


//alta
router.post('/registro', async(req,res)=>{
  
try {
  const { name, password } = req.body;

  const user = await User.findOne({ name });
  
  if (user) {
    const mensaje = 'Ya existe una cuenta con este nombre.';
    res.render('notification', { mensaje }); // Renderiza la plantilla EJS con el mensaje
}else{
  const user = new User({name,password});
  console.log(user);
  await user.save();
  req.session.usuario = { id: 1, nombre: name };

  const mensaje = 'La cuenta se creó correctamente.';
  res.render('notification', { mensaje }); // Renderiza la plantilla EJS con el mensaje

}

} catch (error) {
  res.status(500).json({ error: error.message });
}

});



    



//alta
router.get('/registro', async(req,res)=>{
  res.render('register'); // Renderiza la vista 'index.ejs'

});


router.get('/login', (req, res) => {
  res.render('login'); // Renderiza la vista 'index.ejs'

});







//modifiacoin
/*router.put('/:id',async (req,res)=>{
    const {title, description} = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    res.json({status: 'Tarea actualizada.'});

});*/

//baja
/*router.delete('/:id',async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id,newTask);
    req.json({status: 'Tarea eliminada.'});

});
*/
//----------------------------------------------------------------


//----------------------------------------------------------------
router.post('/login', async (req, res) => {
 
    try {
      const { name, password } = req.body;
  
      const user = await User.findOne({ name });
  
      if (user) {
        // El usuario existe en la base de datos, ahora comparamos las contraseñas
        const isPasswordValid = await user.comparePassword(password);
        
        if (isPasswordValid) {
          //----
          req.session.usuario = { id: 1, nombre: name };
          //res.send('¡Inicio de sesión exitoso!');
            
          //----
          res.json({ exists: true, message: 'Credenciales válidas' });
        } else {
          res.json({ exists: true, message: 'Credenciales inválidas' });
        }
      } else {
        // El usuario no fue encontrado
        res.json({ exists: false, message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });





router.get('/logout', (req, res) => {
  // Eliminar la sesión
  req.session.destroy(err => {
    if (err) {
      // Manejar cualquier error que pueda ocurrir al eliminar la sesión
      console.log(err);
    } else {
      // Redirigir al usuario a alguna página, por ejemplo, la página de inicio
      res.json('sesion eliminada');
    }
  });
});






module.exports = router;
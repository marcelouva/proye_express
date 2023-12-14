const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');

const requireLogin = require('../helpers/utils');

//const requireLogin = require('../helpers/utils');
//import { requireLogin } from '../helpers/utils';

const activityController = require('../controllers/activityController');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '../pdffiles/');
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para el archivo
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Crea la instancia de multer con la configuración de almacenamiento
const upload = multer({ storage });

// Manejador para la carga del archivo
router.post('/actividades/alta', upload.single('archivoPDF'), (req, res) => {
  // Obtiene la URL del archivo cargado
  const fileUrl = req.file.path; // Obtener la ruta del archivo subido por multer
  const nombre = req.body.nombre; // Acceder al campo 'nombre' del formulario
  const descripcion = req.body.descripcion; // Acceder al campo 'descripcion' del formulario
  const tags = req.body.tags; // Acceder al campo 'tags' del formulario
  const urlArchivo = fileUrl; // Usar la ruta del archivo almacenado por multer
  
  console.log(fileUrl);
  console.log(nombre);
  console.log(descripcion);
  console.log(tags);


  
  // Aquí puedes hacer lo que necesites con la URL del archivo (por ejemplo, guardarla en la base de datos)

  // Continúa con el procesamiento del formulario...
});






















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


router.get('/administrar', requireLogin, async(req,res)=>{
  res.render('administra'); // Renderiza la vista 'index.ejs'

});


    
router.get('/profile1', requireLogin, async(req,res)=>{
  const nombre  = req.session.usuario.nombre;
  console.log(">>>>"+nombre);
  res.render('profile',{username:nombre}); // Renderiza la vista 'index.ejs'

});



//alta
router.get('/registro', async(req,res)=>{
  res.render('registro'); // Renderiza la vista 'index.ejs'

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
  
      //const user = await User.findOne({ name });
      const user = await User.findOne({ name }).populate('subjects').exec();


      if (user) {
        // El usuario existe en la base de datos, ahora comparamos las contraseñas
        const isPasswordValid = await user.comparePassword(password);
        
        if (isPasswordValid) {
          req.session.usuario = { id: 1, nombre: name };

          const asignaturas = await user.subjects;
          console.log("===>"+asignaturas);
          res.render('profile1',{ username: name, documentos: asignaturas });
         // res.render('profile1',{username:name},{documentos}); // Renderiza la vista 'index.ejs'
        } else {
          const imageUrl = 'user_no_encontrado.png'; // Ruta de la imagen de error
          const errorMessage = 'Credenciales inválidas.';
          const link = 'login'; // Ruta de la otra página
          res.render('error', { imageUrl, errorMessage, link });        }
      } else {
        // El usuario no fue encontrado
        const imageUrl = 'user_no_encontrado.png'; // Ruta de la imagen de error
        const errorMessage = 'El usuario no ha sido encontrado.!!';
        const link = 'login'; // Ruta de la otra página
        res.render('error', { imageUrl, errorMessage, link });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



router.get('/activities/:subjectId', async (req, res) => {
  const subjectId = req.params.subjectId; // Obtenemos el ID de la asignatura desde la URL
  try {
    // Aquí debes escribir la lógica para buscar actividades por el ID de la asignatura
    // Supongamos que tienes una función en tu controlador que realiza esta búsqueda
    const activities = await actividadController.getActivitiesBySubjectId(subjectId);
    res.render('actividades', { activities }); // Renderiza la vista de actividades con la lista obtenida
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).send('Error al obtener actividades');
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
      res.render('login'); // Renderiza la vista 'index.ejs'
    }
  });
});


router.get('/addactivity', requireLogin, async(req,res)=>{
 
  res.render('activityview'); // Renderiza la vista 'index.ejs'

});



module.exports = router;
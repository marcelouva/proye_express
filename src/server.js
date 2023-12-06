const  express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser'); // Asegúrate de importar bodyParser

const {mongoose} = require('./database');

const session = require('express-session');


app.set('port',process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'caleidoscopio-secreta', // Esta clave se utiliza para firmar la cookie de la sesión
  resave: false, // Evita que la sesión se guarde en el servidor si no hay cambios
  saveUninitialized: false // Evita guardar sesiones vacías
}));


// Middleware de autenticación





//Routes

//app.use('/api/tasks',require('./routes/task.routes'));
app.use('/',require('./routes/user.routes'));
//app.use('/otra',require('./routes/other.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});

//module.exports = {requireLogin};
//module.exports.requireLogin = requireLogin; // Exporta requireLogin

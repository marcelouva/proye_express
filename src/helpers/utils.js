
  const requireLogin = (req, res, next) => {
    if (req.session && req.session.usuario) {
      // Si la sesión existe, permitir el acceso
      next();
    } else {
      // Si no hay sesión, redirigir al inicio de sesión o devolver un error

      const imageUrl = 'no_autorizado.png'; // Ruta de la imagen de error
      const errorMessage = 'Debes logearte para poder ingresar!!';
      const link = 'login'; // Ruta de la otra página
      res.render('error', { imageUrl, errorMessage, link });


      //res.status(401).send('Accccceso no autorizado');
    }
  };
  
  module.exports = requireLogin;
  

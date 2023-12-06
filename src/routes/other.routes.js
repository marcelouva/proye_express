const express = require('express');
const router = express.Router();


//abajo defino los endpoints




router.get('/', async (req,res)=>{
res.render('index'); // Renderiza la vista 'index.ejs'


});


router.get('/algo', (req, res) => {
    res.send('¡Hola desde /otra/algo!');
  });

module.exports = router


module.exports = router;
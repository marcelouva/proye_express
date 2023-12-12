const mongoose = require('mongoose');
const Subject = require('./models/subject'); 
const User    = require('./models/user');



async function seedDatabase() {
    try {
      await mongoose.connect('mongodb://localhost/bdtareas');
  
      console.log('Conexión exitosa a la base de datos');
  
      
      const [robotica,frances,lengua,] = await Subject.create([
        { id:5000, name: 'Robótica', course:'6A' },
        { id:5001, name: 'Francés', course:'6A' },
        { id:5002, name: 'Lengua', course:'6A' },
      ]);
  
      await robotica.save();
      await lengua.save();
      await frances.save();
      
      console.log('Asignaturas creadas');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      mongoose.disconnect();
    }
  }
  
  seedDatabase();






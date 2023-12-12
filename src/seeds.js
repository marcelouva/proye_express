const mongoose = require('mongoose');
const Subject = require('./models/subject'); 
const User    = require('./models/user');



async function seedDatabase() {
    try {
      await mongoose.connect('mongodb://localhost/bdtareas');
  
      console.log('Conexión exitosa a la base de datos');
  
      // Crear los usuarios Marcos y Pedro
      const [marcos, pedro] = await User.create([
        { name: 'Marcos', password: 'marcos' },
        { name: 'Pedro', password: 'pedro' },
      ]);
  
      // Buscar las asignaturas Mate, Biología, Inglés y Geo

      const [robotica,frances,lengua,] = await Subject.create([
        { id:5000, name: 'Robótica', course:'6A' },
        { id:5001, name: 'Francés', course:'6A' },
        { id:5002, name: 'Lengua', course:'6A' },
      ]);
  
      await robotica.save();
      await lengua.save();
      await frances.save();
      // Asociar las asignaturas a los usuarios
      marcos.subjects.push(robotica, lengua);
      await marcos.save();
  
      pedro.subjects.push(robotica,lengua,frances);
      await pedro.save();
  
      console.log('Usuarios y asignaturas creados y vinculados correctamente');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      mongoose.disconnect();
    }
  }
  
  seedDatabase();






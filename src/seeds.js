const mongoose = require('mongoose');
const Subject = require('./models/subject'); 
const User    = require('./models/user');



async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/bdtareas');

    console.log('Conexión exitosa a la base de datos');

    // Crear los usuarios Marcos y Pedro
    const [lucas, lito] = await User.create([
      { name: 'lucas', password: 'lucas' },
      { name: 'lito', password: 'lito' },
    ]);

    // Buscar o crear las asignaturas Mate, Biología, Inglés y Geo
    const [robotica, frances, lengua] = await Subject.create([
      { id: 50, name: 'Robótica', course: '6A' },
      { id: 52, name: 'Francés', course: '6A' },
      { id: 54, name: 'Lengua', course: '6A' },
    ]);

    // Asociar las asignaturas a los usuarios
    lucas.subjects.push(robotica, lengua);
    await lucas.save();

    lito.subjects.push(robotica, lengua, frances);
    await lito.save();

    console.log('Usuarios y asignaturas creados y vinculados correctamente');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();






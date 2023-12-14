// activityController.js

const Activity = require('../models/activity'); // Importa el modelo de Activity
const Subject = require('../models/subject'); // Importa el modelo de Activity

const activityController = {
  // Obtener todas las actividades
  getAllActivities: async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener actividades' });
    }
  },

  // Obtener actividad por ID
  getActivityById: async (req, res) => {
    const { activityId } = req.params;
    try {

            const activity = await Activity.findById(activityId);
      if (!activity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la actividad' });
    }
  },

  // Crear una nueva actividad
  createActivity: async (req, res) => {
    const { name, description,tags} = req.body;
    const fileUrl = req.file.path; 
    try {
      const newActivity = await Activity.create({ name, description,tags,fileUrl });
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la actividad' });
    }
  },

  // Actualizar una actividad existente
  updateActivity: async (req, res) => {
    const { activityId } = req.params;
    const { name, description } = req.body;
    try {
      const updatedActivity = await Activity.findByIdAndUpdate(activityId, { name, description }, { new: true });
      if (!updatedActivity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la actividad' });
    }
  },

  // Eliminar una actividad
  deleteActivity: async (req, res) => {
    const { activityId } = req.params;
    try {
      const deletedActivity = await Activity.findByIdAndDelete(activityId);
      if (!deletedActivity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      res.status(200).json({ message: 'Actividad eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la actividad' });
    }
  },

  // Otras operaciones relacionadas con actividades...


  getActivitiesBySubjectId: async (req, res) => {
    const { subjectId } = req.params; // Suponiendo que subjectId viene de los parámetros de la solicitud
    try {
     const subject = await Subject.finbyId({ id: subjectId });
      const activities = await asignatura.findOne({ name }).populate('activities').exec();

      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener actividades por subjectId' });
    }
  }

  

};

module.exports = activityController;
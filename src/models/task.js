const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    // Otros campos relacionados con la tarea
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

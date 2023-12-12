const mongoose = require('mongoose');
const {Schema}  = mongoose;

const SubjectSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }]

});


SubjectSchema.pre('save', function(next) {
    // Recorrer los campos del esquema
    for (let key in this.schema.paths) {
        // Verificar si el campo es de tipo String y si tiene un valor asignado
        if (this[key] && this[key] instanceof String) {
            // Eliminar espacios en blanco al inicio y al final, y convertir a mayúsculas
            this[key] = this[key].trim().toUpperCase();
        }
    }
    next();
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;


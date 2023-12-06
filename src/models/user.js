const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');



const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};



const User = mongoose.model('User', UserSchema);

module.exports = User;

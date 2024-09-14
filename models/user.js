const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese su nombre']
    },
    email:{
        type : String,
        required: [true, 'Por favor ingrese su correo'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese su contraseña'],
    }
});

// Encriptar password antes de guardar en la base de datos
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//comparar password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
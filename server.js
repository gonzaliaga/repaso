const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);

//Conexión a la base de datos Mongodb
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => console.log('Conexión a Mongo Exitoso'))
.catch(error => console.log(error));



app.listen(PORT, () => console.log(`Servidor corriendo en port ${PORT}`));

const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database.js');
const userRoutes = require('./routes/api/usersRoutes.js');
const carRoutes = require('./routes/api/carRoutes.js');
const appointmentRoutes = require('./routes/api/appointmentsRouts.js');
const serviceRoutes = require('./routes/api/serviceRouts.js');
const seedData = require('./seed.js');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/service', serviceRoutes);

sequelize.sync()
  .then(async () => {
    console.log('Conectat la DB și sincronizat!');
    
    await seedData();
    
    app.listen(3000, () => {
      console.log('Serverul rulează pe http://localhost:3000');
    });
  })
  .catch(err => console.error('Eroare DB:', err));

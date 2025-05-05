const User = require('./models/User');
const Car = require('./models/Car');
const UserCar = require('./models/UserCar');
const ActiveCar = require('./models/ActiveCars');
const ActiveUser = require('./models/ActiveUsers');
const Appointment = require('./models/Appointments');
const sequelize = require('./config/database');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Crearea utilizatorilor
    const user1 = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
    });

    const user2 = await User.create({
      first_name: 'Jane',
      last_name: 'Smith',
      phone: '0987654321',
      email: 'jane.smith@example.com',
    });

    const car1 = await Car.create({
      registration_number: 'ABC123',
      chassis_number: 'XYZ123456789',
      brand: 'Toyota',
      model: 'Corolla',
      manufacture_year: 2020,
      engine_type: 'Petrol',
      engine_capacity: 1800,
      horsepower: 140,
      kw_power: 103,
    });

    const car2 = await Car.create({
      registration_number: 'XYZ456',
      chassis_number: 'ABC987654321',
      brand: 'Honda',
      model: 'Civic',
      manufacture_year: 2021,
      engine_type: 'Diesel',
      engine_capacity: 2000,
      horsepower: 160,
      kw_power: 120,
    });

    await UserCar.create({
      userId: user1.id,
      carId: car1.id,
    });
    await UserCar.create({
      userId: user2.id,
      carId: car2.id,
    });

    await ActiveUser.create({
      status: 1,
    });

    await ActiveUser.create({
      status: 1,
    });

    await ActiveCar.create({
      status: 1,
    });

    await ActiveCar.create({
      status: 1,
    });

    await Appointment.create({
      user_id: user1.id,
      appointment_method: 'Email',
      car_appointment: car1.registration_number,
      action: 'Revizie tehnica',
      appointment_date: new Date('2025-04-27 10:00:00'),
      appointment_duration: 60,
    });

    await Appointment.create({
      user_id: user2.id,
      appointment_method: 'Telefonic',
      car_appointment: car2.registration_number,
      action: 'Schimb ulei',
      appointment_date: new Date('2025-04-27 11:00:00'),
      appointment_duration: 60,
    });

    console.log('Datele au fost adăugate cu succes!');
  } catch (error) {
    console.error('Eroare la adăugarea datelor în baza de date:', error);
  }
};

module.exports = seedDatabase;

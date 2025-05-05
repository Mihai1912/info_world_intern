const Car = require('./../models/Car');
const UserCar = require('./../models/UserCar');
const ActiveCars = require('./../models/ActiveCars');
const User = require('./../models/User');

const createCar = async (req, res) => {
  try {
    const {registration_number, chassis_number, brand, model, manufacture_year, engine_type, engine_capacity, horsepower } = req.body;

    const owner_id = req.params.id;

    const user = await User.findByPk(owner_id);

    if(!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const newCar = await Car.create({
      registration_number,
      chassis_number,
      brand,
      model,
      manufacture_year,
      engine_type,
      engine_capacity,
      horsepower,
      kw_power: Math.round((horsepower * 0.7457) * 100) / 100
    });

    await UserCar.create({
      userId: user.id,
      carId: newCar.id
    });

    await ActiveCars.create({
      status: 1
    });

    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la crearea mașinii' });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea mașinilor' });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: 'Mașina nu a fost găsită' });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea mașinii' });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { registration_number, chassis_number, brand, model, manufacture_year, engine_type, engine_capacity, horsepower, kw_power } = req.body;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: 'Mașina nu a fost găsită' });
    }

    car.registration_number = registration_number || car.registration_number;
    car.chassis_number = chassis_number || car.chassis_number;
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.manufacture_year = manufacture_year || car.manufacture_year;
    car.engine_type = engine_type || car.engine_type;
    car.engine_capacity = engine_capacity || car.engine_capacity;
    car.horsepower = horsepower || car.horsepower;
    car.kw_power = kw_power || car.kw_power;

    await car.save();

    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la actualizarea mașinii' });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: 'Mașina nu a fost găsită' });
    }

    await UserCar.destroy({where: { carId: id }});

    await ActiveCars.destroy({ where: { carId: id }});

    await car.destroy();
    res.status(200).json({ message: 'Mașina a fost ștersă cu succes' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la ștergerea mașinii' });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar
};

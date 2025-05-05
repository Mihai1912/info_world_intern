const User = require('./../models/User');
const UserCar = require('./../models/UserCar');
const ActiveUser = require('./../models/ActiveUsers');
const ActiveCars = require('./../models/ActiveCars');
const Car = require('./../models/Car');

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, car: {registration_number, chassis_number, brand, model, manufacture_year, engine_type, engine_capacity, horsepower} } = req.body;

    const newUser = await User.create({
      first_name,
      last_name,
      phone,
      email
    });

    await ActiveUser.create({
      status: 1,
    });

    const car = await Car.create({
      registration_number,
      chassis_number,
      brand,
      model,
      manufacture_year,
      engine_type,
      engine_capacity,
      horsepower,
      kw_power: Math.round((horsepower * 0.7457) * 100) / 100,
    });

    await UserCar.create({
      userId: newUser.id,
      carId: car.id,
    });

    await ActiveCars.create({
      status: 1,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la crearea utilizatorului' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea utilizatorilor' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea utilizatorului' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, email } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.phone = phone || user.phone;
    user.email = email || user.email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la actualizarea utilizatorului' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    const userCars = await UserCar.findAll({ where: { userId: id } });
    for (const userCar of userCars) {
      await ActiveCars.destroy({ where: { id: userCar.carId } });
      await Car.destroy({ where: { id: userCar.carId } });
      await userCar.destroy();
    }

    await ActiveUser.destroy({ where: { id: user.id } });

    await user.destroy();
    res.status(200).json({ message: 'Utilizatorul a fost șters cu succes' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la ștergerea utilizatorului' });
  }
};

const getUserCars = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: {
        model: require('./../models/Car'),
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    res.status(200).json(user.Cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la obținerea mașinilor utilizatorului' });
  }
};



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserCars
};

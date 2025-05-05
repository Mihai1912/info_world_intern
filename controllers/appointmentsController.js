const Appointment = require('./../models/Appointments');
const User = require('./../models/User');
const Car = require('./../models/Car');
const duration = require('./../utils/durations');

const createAppointment = async (req, res) => {
    const { appointment_method } = req.params;
    const { user_id, car_appointment, action} = req.body;

    try {
        
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
        }

        const car = await Car.findOne({ where: { registration_number: car_appointment } });
        if (!car) {
            return res.status(404).json({ message: 'Mașina nu a fost găsită' });
        }

        const lastAppointment = await Appointment.findOne({
            order: [
                ['appointment_date', 'DESC']
            ]
        });

        let newAvailableDate = new Date(lastAppointment.dataValues.appointment_date);
        newAvailableDate.setMinutes(newAvailableDate.getMinutes() + lastAppointment.dataValues.appointment_duration);

        if (newAvailableDate.getHours() >= 17) {
            newAvailableDate.setHours(8);
            newAvailableDate.setMinutes(0);
            newAvailableDate.setDate(newAvailableDate.getDate() + 1);
        }

        const appointmentDate = newAvailableDate;
        const appointmentDuration = duration.get(action);

        const newAppointment = await Appointment.create({
            user_id,
            appointment_method,
            car_appointment: car.registration_number,
            action,
            appointment_date: appointmentDate,
            appointment_duration: appointmentDuration
        });

        res.status(201).json(newAppointment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la crearea programării' });
    }
}

const getAppointments = async (req, res) => {
    const { user_id } = req.params;

    try {
        const appointments = await Appointment.findAll({
            where: { user_id },
            include: [User, Car]
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'Nu există programări pentru acest utilizator' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la obținerea programărilor' });
    }
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id, {
            include: [User, Car]
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Programarea nu a fost găsită' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la obținerea programării' });
    }
}

const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { appointment_method, car_appointment, action } = req.body;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Programarea nu a fost găsită' });
        }

        appointment.appointment_method = appointment_method || appointment.appointment_method;
        appointment.car_appointment = car_appointment || appointment.car_appointment;
        appointment.action = action || appointment.action;

        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la actualizarea programării' });
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Programarea nu a fost găsită' });
        }

        await appointment.destroy();

        res.status(200).json({ message: 'Programarea a fost ștearsă cu succes' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la ștergerea programării' });
    }
}

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
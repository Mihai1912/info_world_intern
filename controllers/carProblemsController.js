const Car = require('../models/Car');
const CarProblems = require('../models/CarProblems');

const createCarProblem = async (req, res) => {
    try {
        const { car_id, problem_description, status } = req.body;
    
        const newProblem = await CarProblems.create({
        car_id,
        problem_description,
        status,
        });
    
        res.status(201).json(newProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating car problem' });
    }
    }

const getAllCarProblems = async (req, res) => {
    try {
        const carProblems = await CarProblems.findAll();
        res.status(200).json(carProblems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching car problems' });
    }
}

const getCarProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const carProblem = await CarProblems.findByPk(id);
        if (!carProblem) {
            return res.status(404).json({ message: 'Car problem not found' });
        }
        res.status(200).json(carProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching car problem' });
    }
}

const updateCarProblem = async (req, res) => {
    const { id } = req.params;
    const { car_id, problem_description, status } = req.body;

    try {
        const carProblem = await CarProblems.findByPk(id);
        if (!carProblem) {
            return res.status(404).json({ message: 'Car problem not found' });
        }

        carProblem.car_id = car_id;
        carProblem.problem_description = problem_description;
        carProblem.status = status;

        await carProblem.save();

        res.status(200).json(carProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating car problem' });
    }
}

const deleteCarProblem = async (req, res) => {
    const { id } = req.params;

    try {
        const carProblem = await CarProblems.findByPk(id);
        if (!carProblem) {
            return res.status(404).json({ message: 'Car problem not found' });
        }

        await carProblem.destroy();

        res.status(204).json({ message: 'Car problem deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting car problem' });
    }
}

const getCarProblemsByCarId = async (req, res) => {
    const { car_id } = req.params;

    try {
        const carProblems = await CarProblems.findAll({ where: { car_id } });
        if (!carProblems) {
            return res.status(404).json({ message: 'No problems found for this car' });
        }
        res.status(200).json(carProblems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching car problems' });
    }
}

module.exports = {
    createCarProblem,
    getAllCarProblems,
    getCarProblemById,
    updateCarProblem,
    deleteCarProblem,
    getCarProblemsByCarId
};
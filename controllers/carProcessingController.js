const Car = require('../models/Car');
const CarProblems = require('../models/CarProblems');

const processCar = async (req, res) => {
    try {
        const { car_id, problem_id, status } = req.body;

        const car = await Car.findByPk(car_id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const problem = await CarProblems.findByPk(problem_id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        problem.status = status;
        await problem.save();

        res.status(201).json(newProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing the car' });
    }
}

module.exports = {
    processCar,
};
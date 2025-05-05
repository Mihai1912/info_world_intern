const express = require('express');
const router = express.Router();
const carProblemsController = require('./../../controllers/carProblemsController');

router.post('/car-problem', carProblemsController.createCarProblem);
router.get('/car-problem', carProblemsController.getAllCarProblems);
router.get('/car-problem/:id', carProblemsController.getCarProblemById);
router.put('/car-problem/:id', carProblemsController.updateCarProblem);
router.delete('/car-problem/:id', carProblemsController.deleteCarProblem);
router.get('/car-problem/car/:car_id', carProblemsController.getCarProblemsByCarId);

router.post('/car-processing', carProcessingController.processCar);

module.exports = router;
const router = require('express').Router();
const GradeController = require('../controllers/GradeController');

router.post('/grades', GradeController.createGrade);
router.get('/grades', GradeController.findAllGrades);
router.get('/grades/:id', GradeController.findGradeById);
router.put('/grades/:id', GradeController.updateGradeById);
router.delete('/grades/:id', GradeController.deleteGradeById);

module.exports = router;
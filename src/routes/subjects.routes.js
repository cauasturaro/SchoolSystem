const router = require('express').Router();
const SubjectController = require('../controllers/SubjectController');

router.post('/subjects', SubjectController.createSubject);
router.get('/subjects', SubjectController.findAllSubjects);
router.get('/subjects/:id', SubjectController.findSubjectById);
router.put('/subjects/:id', SubjectController.updateSubjectById);
router.delete('/subjects/:id', SubjectController.deleteSubjectById);

module.exports = router;
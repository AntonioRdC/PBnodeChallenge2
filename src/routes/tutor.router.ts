/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../app/controllers/TutorController';
import CreateValidation from '../app/middlewares/TutorCreateValidate';
import PutValidation from '../app/middlewares/TutorPutValidate';
import GetValidation from '../app/middlewares/TutorGetValidate';

const router = Router();

router.post('/tutor', CreateValidation, TutorController.create);
router.get('/tutors', GetValidation, TutorController.get);
router.put('/tutor/:id', PutValidation, TutorController.put);
router.delete('/tutor/:id', TutorController.delete);

export default router;

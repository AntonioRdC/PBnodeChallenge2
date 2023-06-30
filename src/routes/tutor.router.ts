/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../app/controllers/TutorController';
import CreateValidation from '../app/middlewares/TutorCreateValidate';
import PutValidation from '../app/middlewares/TutorPutValidate';
import GetValidation from '../app/middlewares/TutorGetValidate';
import AuthVerify from '../app/middlewares/AuthVerify';

const router = Router();

router.post('/tutor', CreateValidation, TutorController.create);
router.get('/tutors', AuthVerify, GetValidation, TutorController.get);
router.put('/tutor/:id', AuthVerify, PutValidation, TutorController.put);
router.delete('/tutor/:id', AuthVerify, TutorController.delete);

export default router;

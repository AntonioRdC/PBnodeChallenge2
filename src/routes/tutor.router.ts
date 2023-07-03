/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../app/controllers/TutorController';
import CreateValidation from '../app/middlewares/validations/TutorCreateValidate';
import PutValidation from '../app/middlewares/validations/TutorPutValidate';
import GetValidation from '../app/middlewares/validations/TutorGetValidate';
import AuthVerify from '../app/middlewares/AuthVerify';

const router = Router();

router.post('/tutor', CreateValidation, TutorController.post);
router.get('/tutors', AuthVerify, GetValidation, TutorController.get);
router.put(
  '/tutor/:tutorId',
  AuthVerify,
  PutValidation,
  TutorController.update
);
router.delete('/tutor/:tutorId', AuthVerify, TutorController.delete);

export default router;

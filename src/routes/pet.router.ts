/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import PetController from '../app/controller/PetController';
import petCreateAndPutValidation from '../app/middlewares/PetCreateAndPutValidate';
import AuthVerify from '../app/middlewares/AuthVerify';

const router = Router();

router.post(
  '/pet/:tutorId',
  AuthVerify,
  petCreateAndPutValidation,
  PetController.create
);
router.put(
  '/pet/:petId/tutor/:tutorId',
  AuthVerify,
  petCreateAndPutValidation,
  PetController.put
);
router.delete('/pet/:petId/tutor/:tutorId', AuthVerify, PetController.delete);

export default router;

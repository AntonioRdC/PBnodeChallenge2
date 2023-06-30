import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import type { IAuth, IAuthResponse } from '../interfaces/IAuth';
import TutorRepository from '../repositories/TutorRepository';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import authConfig from '../config/auth';

class AuthService {
  async create(payload: IAuth): Promise<IAuthResponse> {
    const tutor = await TutorRepository.getByEmailToAuth(payload.email);
    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const verifyAuth = await bcrypt.compare(payload.password, tutor.password);
    if (!verifyAuth) throw new BadRequestError('Invalid password');

    const auth = jwt.sign(
      { id: tutor._id, email: payload.email },
      authConfig.secret,
      {
        expiresIn: '1h',
      }
    );

    const result = { access_token: auth };
    return result;
  }
}

export default new AuthService();

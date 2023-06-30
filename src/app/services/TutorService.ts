import type { PaginateResult } from 'mongoose';
import bcrypt from 'bcryptjs';

import type { ITutor, ITutorResponse } from '../interfaces/ITutor';
import TutorRepository from '../repositories/TutorRepository';
import NotFoundError from '../errors/NotFoundError';

class TutorService {
  async create(payload: ITutor): Promise<ITutorResponse> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;

    const result = await TutorRepository.create(payload);
    result.password = undefined;

    return result;
  }

  async get(payload): Promise<PaginateResult<ITutorResponse>> {
    const { page, limit } = payload;
    let validatePage: number;
    let validateLimit: number;

    if (typeof page === 'string') {
      validatePage = Number(page);
    } else {
      validatePage = 1;
    }

    if (typeof limit === 'string') {
      validateLimit = Number(limit);
    } else {
      validateLimit = 10;
    }

    return await TutorRepository.get(validatePage, validateLimit);
  }

  async put(id: string, payload: ITutor): Promise<ITutorResponse> {
    const result = await TutorRepository.update(id, payload);
    if (result === null) throw new NotFoundError('Not found Tutor');

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await TutorRepository.delete(id);
    if (result === null) throw new NotFoundError('Not found Tutor');
  }
}

export default new TutorService();

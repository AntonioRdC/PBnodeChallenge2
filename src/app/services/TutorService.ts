import bcrypt from 'bcryptjs';

import type {
  ITutor,
  ITutorResponse,
  ITutorPaginate,
} from '../interfaces/ITutor';
import TutorRepository from '../repositories/TutorRepository';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

class TutorService {
  async post(payload: ITutor): Promise<ITutorResponse> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;

    const result = await TutorRepository.post(payload);

    result.password = undefined;
    result.pets = undefined;

    return result;
  }

  async get(payload): Promise<ITutorPaginate> {
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

    const tutors = await TutorRepository.get(validatePage, validateLimit);

    return tutors;
  }

  async update(id: string, payload: ITutor): Promise<ITutorResponse> {
    const result = await TutorRepository.update(id, payload);
    if (result === null) throw new NotFoundError('Not found Tutor');

    return result;
  }

  async delete(id: string): Promise<void> {
    const verifyPets = await TutorRepository.getById(id);
    if (verifyPets?.pets?.length !== 0)
      throw new UnauthorizedError('Tutors have Pets associates');

    const result = await TutorRepository.delete(id);
    if (result === null) throw new NotFoundError('Not found Tutor');
  }
}

export default new TutorService();

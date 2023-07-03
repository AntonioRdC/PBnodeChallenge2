import type { IPet, IPetResponse } from '../interfaces/IPet';
import TutorRepository from '../repositories/TutorRepository';
import PetRepository from '../repositories/PetRepository';
import NotFoundError from '../errors/NotFoundError';

class PetService {
  async create(tutorId: string, payload: IPet): Promise<IPetResponse> {
    const tutor = await TutorRepository.getById(tutorId);
    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const result = await PetRepository.create(tutorId, payload);

    const query = { $push: { pets: [result._id] } };
    await TutorRepository.updateById(tutorId, query);

    return result;
  }

  async put(
    petId: string,
    tutorId: string,
    payload: IPet
  ): Promise<IPetResponse> {
    const tutor = await TutorRepository.getById(tutorId);
    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const result = await PetRepository.update(petId, payload);
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }

  async delete(petId: string, tutorId: string): Promise<void> {
    const query = { $pull: { pets: petId } };
    const tutor = await TutorRepository.updateById(tutorId, query);
    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const result = await PetRepository.delete(petId);
    if (result === null) throw new NotFoundError('Not found Pet');
  }
}

export default new PetService();

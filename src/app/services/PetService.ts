import type { IPet, IPetResponse } from '../interfaces/IPet';
import PetRepository from '../repositories/PetRepository';
import NotFoundError from '../errors/NotFoundError';

class PetService {
  async create(tutorId: string, payload: IPet): Promise<IPetResponse> {
    const result = await PetRepository.create(tutorId, payload);

    return result;
  }

  async put(id: string, payload: IPet): Promise<IPetResponse> {
    const result = await PetRepository.update(id, payload);
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await PetRepository.delete(id);
    if (result === null) throw new NotFoundError('Not found Pet');
  }
}

export default new PetService();

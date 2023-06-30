import NotFoundError from '../errors/NotFoundError';
import type { IPet, IPetResponse } from '../interfaces/IPet';
import TutorRepository from '../repositories/TutorRepository';
import PetSchema from '../schemas/PetSchema';

class PetRepository {
  async create(tutorId: string, payload: IPet): Promise<IPetResponse> {
    const tutor = await TutorRepository.getById(tutorId);

    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const result = await PetSchema.create(payload);

    await tutor.updateOne({ $push: { pets: [result._id] } });

    return result;
  }

  async update(id: string, payload: IPet): Promise<IPetResponse | null> {
    return await PetSchema.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    }).select('-password _id');
  }

  async get(): Promise<IPetResponse[]> {
    return await PetSchema.find();
  }

  async delete(id: string): Promise<IPetResponse | null> {
    return await PetSchema.findByIdAndDelete(id);
  }
}

export default new PetRepository();

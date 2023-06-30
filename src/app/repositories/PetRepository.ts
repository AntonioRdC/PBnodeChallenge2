import type { IPet, IPetResponse } from '../interfaces/IPet';
import PetSchema from '../schemas/PetSchema';

class PetRepository {
  async create(tutorId: string, payload: IPet): Promise<IPetResponse> {
    return await PetSchema.create({ ...payload, tutor_id: tutorId });
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

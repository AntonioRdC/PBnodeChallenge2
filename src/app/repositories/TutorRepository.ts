import type { PaginateResult } from 'mongoose';

import type {
  ITutor,
  ITutorResponse,
  ITutorPasswordResponse,
} from '../interfaces/ITutor';
import TutorSchema from '../schemas/TutorSchema';

class TutorRepository {
  async post(payload: ITutor): Promise<ITutorResponse> {
    return await TutorSchema.create(payload);
  }

  async get(
    page: number,
    limit: number
  ): Promise<PaginateResult<ITutorResponse>> {
    const options = {
      select: '-password',
      populate: { path: 'pets', model: 'Pet' },
    };
    const result = await TutorSchema.paginate(
      {},
      { page, limit, options, ...options }
    );

    return result;
  }

  async update(
    tutorId: string,
    payload: ITutor
  ): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(tutorId, payload, {
      returnDocument: 'after',
      runValidators: true,
    }).select('-password -_id -pets');
  }

  async delete(
    tutorId: string,
    query?: object
  ): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndDelete(tutorId, query);
  }

  async updatePet(
    tutorId: string,
    query: object
  ): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(tutorId, query);
  }

  async getById(tutorId: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findById(tutorId);
  }

  async getPet(query: object): Promise<ITutorResponse | null> {
    return await TutorSchema.findOne(query);
  }

  async getByEmailToAuth(
    email: string
  ): Promise<ITutorPasswordResponse | null> {
    return await TutorSchema.findOne({ email }).select('password');
  }
}

export default new TutorRepository();

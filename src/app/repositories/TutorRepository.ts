import type { PaginateResult, UpdateWriteOpResult } from 'mongoose';

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

  async update(id: string, payload: ITutor): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    }).select('-password -_id -pets');
  }

  async delete(id: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndDelete(id);
  }

  async updateOne(query: object): Promise<UpdateWriteOpResult> {
    return await TutorSchema.updateOne(query);
  }

  async getById(id: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findById(id);
  }

  async getByEmailToAuth(
    email: string
  ): Promise<ITutorPasswordResponse | null> {
    return await TutorSchema.findOne({ email }).select('password');
  }
}

export default new TutorRepository();

import type { PaginateResult } from 'mongoose';

import type { ITutor, ITutorResponse } from '../interfaces/ITutor';
import TutorSchema from '../schemas/TutorSchema';

class TutorRepository {
  async create(payload: ITutor): Promise<ITutorResponse> {
    return await TutorSchema.create(payload);
  }

  async get(
    page: number,
    limit: number
  ): Promise<PaginateResult<ITutorResponse>> {
    const options = {
      select: '-password',
    };
    return await TutorSchema.paginate({}, { page, limit, options });
  }

  async getById(id: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findById(id).select(['-password']);
  }

  async update(id: string, payload: ITutor): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    }).select(['-password', '-_id']);
  }

  async delete(id: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndDelete(id);
  }
}

export default new TutorRepository();

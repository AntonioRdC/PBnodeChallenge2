import type { Types } from 'mongoose';

export interface ITutor {
  name: string;
  password: string;
  phone: string;
  email: string;
  date_of_birth: string;
  zip_code: number;
}

export interface ITutorResponse {
  _id: Types.ObjectId;
  name: string;
  password?: string;
  phone: string;
  email: string;
  date_of_birth: string;
  zip_code: number;
  __v?: number;
}

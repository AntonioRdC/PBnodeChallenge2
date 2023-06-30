import type { Types } from 'mongoose';

export interface IPet {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: string;
  tutor_id: Types.ObjectId;
}

export interface IPetResponse {
  _id: Types.ObjectId;
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: string;
  tutor_id: Types.ObjectId;
}

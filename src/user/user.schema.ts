import * as mongoose from 'mongoose';
import { Gender } from '../emun/./gender.enum';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  // lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  // dateOfBirth: { type: Date, required: true },
  pin: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  // education : { type: String, required: true },
  level_of_study : { type: String, required: true },
  field_of_study : { type: String, required: true },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }],
  createdAt: { type: Date, default: Date.now },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  // lastName: string;
  email: string;
  password: string;
  gender: Gender;
  // dateOfBirth: Date;
  pin: number;
  state: string;
  city: string;
  education: string;
  level_of_study: string;
  field_of_study: string;
  bookmarks: string[];
  createdAt: Date;
}

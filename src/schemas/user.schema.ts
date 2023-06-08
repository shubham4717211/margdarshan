import * as mongoose from 'mongoose';
import { Gender } from '../emun/gender.enum';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  // lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: Object.values(Gender) },
  dateOfBirth: { type: String },
  pin: { type: Number },
  state: { type: String },
  city: { type: String },
  // education : { type: String, required: true },
  level_of_study: { type: String },
  field_of_study: { type: String },
  degree: { type: String },
  category: { type: String },
  father_yearly_income: { type: Number },
  tenth_percentage: { type: Number },
  twelve_percentage: { type: Number },
  bookmarks: [{ type: String, ref: 'Scholarship' }],
  createdAt: { type: Date, default: Date.now },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  // lastName: string;
  email: string;
  password: string;
  gender: Gender;
  dateOfBirth: string;
  pin: number;
  state: string;
  city: string;
  education: string;
  level_of_study: string;
  field_of_study: string;
  degree: string;
  category: string;
  father_yearly_income: number;
  tenth_percentage: number;
  twelve_percentage: number;
  bookmarks: string[];
  createdAt: Date;
}

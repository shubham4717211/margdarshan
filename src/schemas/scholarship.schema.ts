import * as mongoose from 'mongoose';
import { Gender } from 'src/emun/gender.enum';

export const ScholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  scholarshipType: { type: String, required: false },
  isFemaleOnly: { type: Boolean, required: false },
  category: { type: String, required: false },
  Religion: { type: String, required: false },
  minimumFamilyIncome: { type: String, required: false },
  marksRequired: { type: String, required: false },
  doStudentNeedToTakeExam: { type: Boolean, required: false },
  isStartDateExact: { type: Boolean, required: false },
  isEndDateExact: { type: Boolean, required: false },
  gender: { type: String, enum: Object.values(Gender), required: false },
  state: { type: String, required: false },
  // level_of_study: { type: String, enum: ['undergraduate', 'graduate', 'doctoral'], required: true },
  level_of_study: { type: String, required: false },
  feild_of_study: { type: String, required: false },
  tag: { type: [{ type: String }], required: false },
  description: { type: String, required: false },
});

export interface Scholarship extends mongoose.Document {
  id: string;
  slug: string;
  title: string;
  startDate: Date;
  endDate: Date;
  scholarshipType: string;
  isFemaleOnly: boolean;
  category: string;
  Religion: string;
  minimumFamilyIncome: string;
  marksRequired: string;
  doStudentNeedToTakeExam: boolean;
  isStartDateExact: boolean;
  isEndDateExact: boolean;
  gender: Gender;
  state: string;
  level_of_study: string;
  feild_of_study: string;
  tag: string[];
  description: string;
}

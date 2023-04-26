import * as mongoose from 'mongoose';

export const ScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  deadline: { type: Date, required: true },
  applicationProcess: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: String, required: true },
  level: {
    type: String,
    enum: ['undergraduate', 'graduate', 'doctoral'],
    required: true,
  },
  fieldOfStudy: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true },
});

export interface Scholarship extends mongoose.Document {
  id: string;
  name: string;
  provider: string;
  description: string;
  eligibility: string;
  deadline: Date;
  applicationProcess: string;
  amount: number;
  duration: string;
  numAwards: number;
  level: string;
  fieldOfStudy: string;
  location: string;
  website: string;
}

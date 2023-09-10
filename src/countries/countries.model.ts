import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Countries extends Document {
  id: string;
  name: string;
}

export const CountriesSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export const CountriesModel = mongoose.model<Countries>('Countries', CountriesSchema);

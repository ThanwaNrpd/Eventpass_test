import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  countryId: string;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  countryId: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', UserSchema);
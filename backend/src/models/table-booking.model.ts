import mongoose, { Schema, Document } from 'mongoose';

export interface TableBookingDocument extends Document {
  name: string;
  phoneNumber: string;
  userId: string;
  email: string;
  persons: number;
  date: Date;
  createdAt: Date;
}

const TableBookingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    persons: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TableBookingModel = mongoose.model<TableBookingDocument>('TableBooking', TableBookingSchema);
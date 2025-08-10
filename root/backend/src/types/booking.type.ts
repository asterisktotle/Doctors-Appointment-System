import moongose from 'mongoose';

export interface BookingInterface {
  doctor: moongose.Types.ObjectId,           // ref to DoctorProfile
  patient: moongose.Types.ObjectId,          // ref to PatientProfile
  booking_date: Date,
  appointment_time: string,
  reference_code: string,
  status: "pending" | "confirmed" | "cancelled" | "completed",
  notes?: string,
  createdAt: Date,
  updatedAt: Date
}
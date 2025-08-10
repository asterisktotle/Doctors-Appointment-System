import { BookingInterface } from "@/types/booking.type";
import { generateReferenceCode } from "@/utils/generateReferenceCode";
import { Schema, Model, model } from "mongoose";

const statusValue = [ "pending" , "confirmed" ,"cancelled","completed"]
const bookingSchema = new Schema<BookingInterface>(

    {
        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: [true, 'Must have doctor ID'],
        },
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: [true, 'Must have patient ID']
        },
        booking_date: {
            type: Date,
            required: [true, 'Indicate booking date'],
            validate: {
                validator: function(date: Date) {
                return date >= new Date(); // Prevent past dates
                },
                message: 'Booking date cannot be in the past'
            }
        },
        appointment_time: {
            type: String,
            required: true,
        },
        reference_code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
        status: {
            type: String,
            enum: statusValue,
            default: 'pending' 
        }, 
        notes: {
            type: String,
            minLength: [2, 'Must have a minimum of 2 characters'],
            maxLength:[500, 'Max length of 500 characters only']
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        }, 
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        }
    },
    { timestamps: true }
)

bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Auto-generate reference code if not provided
  if (!this.reference_code) {
    this.reference_code = generateReferenceCode();
  }
  
  next();
});


export const Booking = model('Booking', bookingSchema)
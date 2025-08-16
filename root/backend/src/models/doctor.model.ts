import { Schema, model } from "mongoose";
import { DoctorInterface } from '../types/doctor.type';
import { sexCategory } from "./patient.model";

// Constants
const medicalSpecializations = [
    'Cardiology',
    'Dermatology', 
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Neurology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Orthopedic Surgery',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Urology',
    'Other'
] as const;

const availableDays = [
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday', 
    'Sunday'
] as const;


const doctorSchema = new Schema<DoctorInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true ,'First name is required'],
        trim: true,
        minLength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    sex: {
        type: String,
        enum: sexCategory,
        required: [true, 'Indicate your sex']
    },
    birthDate: {
        type: Date
    },
    specialization: {
        type: String,
        enum: {
            values: medicalSpecializations,
            message: 'Please select a valid specialization'
        }
    },
    customSpecialization: {
        type: String,
        trim: true,
        maxlength: [100, 'Custom specialization cannot exceed 100 characters'],
    },
    phone: {
        type: String,
        trim: true
    },
   address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { 
        type: String, 
        default: 'Philippines' 
    },
    _id: false
    }, 
    availability: [{
        days: [{
            type: String,
            enum: availableDays
        }],
        slots: [String],
        _id: false
    }],

}, {
    timestamps: true, 
}

)
// Pre-save middleware to clear customSpecialization if not 'Other'
doctorSchema.pre('save', function(next) {
    if (this.specialization !== 'Other') {
        this.customSpecialization = null;
    }
    next();
});

export const DoctorModel = model<DoctorInterface>('Doctor', doctorSchema);
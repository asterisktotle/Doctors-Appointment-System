import { Schema, model } from "mongoose";
import { DoctorInterface } from '../types/doctor.type';

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
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
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
        required: [true, 'Phone number is required'],
        trim: true
    },

    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minlength: [10, 'Address must be at least 10 characters'],
        maxlength: [200, 'Address cannot exceed 200 characters']
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

export const Doctor = model<DoctorInterface>('Doctor', doctorSchema);
import { PatientInterface } from '@/types/patient.type'
import {Schema, model} from 'mongoose'

export const sexCategory = ['Male' ,'Female' ,'Other']

const patientSchema= new Schema<PatientInterface>({
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
        minLength: 2,
        maxLength: 50,
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
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'Philippines' },
        _id: false
    },
}, 
{
    timestamps: true
}
)


export const Patient = model('Patient',patientSchema)
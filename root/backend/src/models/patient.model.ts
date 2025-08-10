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
    address: {
    type: String,
    trim: true,
    minlength: [10, 'Address must be at least 10 characters'],
    maxlength: [200, 'Address cannot exceed 200 characters']
    },
})


export const Patient = model('Patient',patientSchema)
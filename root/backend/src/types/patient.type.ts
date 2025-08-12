import mongoose  from "mongoose";


export interface PatientInterface {
    userId: mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    sex: 'Male' | 'Female' | 'Other'
    birthDate: Date, 
    phone?: string,
    address: {
        street: string,
        city: string,
        state: string,
        zipCode: string,
        country: string
    }
}

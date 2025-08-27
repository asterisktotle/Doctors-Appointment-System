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

type MedicalSpecialization = 
    | 'Cardiology'
    | 'Dermatology'
    | 'Emergency Medicine'
    | 'Family Medicine'
    | 'Internal Medicine'
    | 'Neurology'
    | 'Obstetrics and Gynecology'
    | 'Oncology'
    | 'Orthopedic Surgery'
    | 'Pediatrics'
    | 'Psychiatry'
    | 'Radiology'
    | 'Surgery'
    | 'Urology'
    | 'Other';

type AvailableDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface DoctorInterface extends PatientInterface {
    specialization: MedicalSpecialization |null,    
    customSpecialization?: string | null,
    availability: [
        {
            days: AvailableDays[],
            slots: string[],

        }
    ]
}

export interface ProfileInterface {
    userId: mongoose.Types.ObjectId
    profile: PatientInterface | DoctorInterface
    role: 'patient' | 'doctor'
}

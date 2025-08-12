import mongoose  from "mongoose";
type AvailableDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';


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

export interface DoctorInterface {
    
    userId: mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    sex: 'Male' | 'Female' | 'Other',
    birthDate: Date,
    specialization: MedicalSpecialization,
    customSpecialization?: string | null,
    phone?: string,
    address: {
        street: string,
        city: string,
        state: string,
        zipCode: string,
        country: string
    },
    availability: [
        {
            days: AvailableDays[],
            slots: string[],

        }
    ]
}


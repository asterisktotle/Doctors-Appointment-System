import moongose  from "mongoose";
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
    
    userId: moongose.Types.ObjectId,
    lastName: string,
    sex: 'Male' | 'Female' | 'Other',
    specialization: MedicalSpecialization,
    customSpecialization?: string | null,
    phone?: string,
    address?: string,
    availability: [
        {
            days: AvailableDays[],
            slots: string[],

        }
    ]
}


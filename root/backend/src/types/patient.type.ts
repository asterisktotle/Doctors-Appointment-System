import moongose  from "mongoose";


export interface PatientInterface {
    userId: moongose.Types.ObjectId,
    lastName: string,
    sex: 'Male' | 'Female' | 'Other'
    phone?: string,
    address?: string,
}

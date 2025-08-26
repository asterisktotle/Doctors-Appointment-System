// Create patient profile

import { PatientModel } from "@/models/patient.model"
import { PatientInterface } from "@/types/patient.type"
import mongoose from "mongoose"


export const createPatientProfile = async (patientData: PatientInterface, session: mongoose.ClientSession) => {
    
    // Get UserId by UserProfile;
    try {
        const profile = new PatientModel({
           userId: patientData.userId,
           firstName: patientData.firstName,
           lastName: patientData.lastName,
           sex: patientData.sex,
           birthDate: patientData.birthDate,
           address: {
               street: patientData.address.street,
               city: patientData.address.city,
               state: patientData.address.state,
               zipCode: patientData.address.zipCode,
               country: patientData.address.country
           }
       })
       profile.save({session})
       const response = profile.toJSON()
        return {
            profile: response
        }
    } catch (error) {
        throw error
    }

    
}

const editPatientProfile = async (patientData: PatientInterface) => {
    
}


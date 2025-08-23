// Create patient profile

import { PatientModel } from "@/models/patient.model"
import { PatientInterface } from "@/types/patient.type"

const createPatientProfile = async (patientData: PatientInterface) => {
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
    profile.save()
    return profile;
}

const editPatientProfile = async (patientData: PatientInterface) => {
    
}


import { PatientModel } from "@/models/patient.model"
import { BaseInfo } from "@/types/profile.type"
export const createPatientProfile = async (patientData: BaseInfo) => {
    
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
       await profile.save()
       const response = profile.toJSON()
        return {
            profile: response
        }
    } catch (error) {
        throw error
    }

    
}



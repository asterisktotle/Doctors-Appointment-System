import { DoctorModel } from "@/models/doctor.model";
import { DoctorInterface } from "@/types/profile.type";


// Write basic info for doctor (see doctor.type)
export const createDoctorProfile = async (doctorData: DoctorInterface) => {

    try {
        const doctorProfile = new DoctorModel({
            userId: doctorData.userId,
            firstName: doctorData.firstName,
            lastName: doctorData.lastName,
            sex: doctorData.sex,
            birthDate: doctorData.birthDate,
            address: {
                street: doctorData.address.street,
                city: doctorData.address.city,
                state: doctorData.address.state,
                zipCode: doctorData.address.zipCode,
                country: doctorData.address.country
            },
            specialization: doctorData.specialization || null,
            customSpecialization: doctorData.customSpecialization || null,
            availability: [],
            
        })
        
        await doctorProfile.save();

        const doctorResponse = doctorProfile.toJSON();

        return {
            profile: doctorResponse
        }

        
    } catch (error) {
        throw error
    }

}


// upload picture with valid ids 




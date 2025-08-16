import { AdminModel } from "@/models/admin.model";
import { DoctorModel } from "@/models/doctor.model";
import { PatientModel } from "@/models/patient.model"

const getPatientProfile = async (userId: string) => {
    const profile = await PatientModel.findOne({userId: userId});

    if(!profile) {
        throw new Error('Profile not found')
    }

    return {
        firstName: profile.firstName,
        lastName: profile.lastName
    }

}
const getDoctorProfile = async (userId: string) => {
    const profile = await DoctorModel.findOne({userId: userId});

    if(!profile) {
        throw new Error('Profile not found')
    }

    return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        specialization: profile.specialization,
        customSpecialization: profile.customSpecialization,
        availability: profile.availability
    }

}

export const createDefaultAdminProfile = async (userId: string) => {
    const adminProfile = new AdminModel({
        userId,
        firstName: 'Admin',
        lastName: 'User',
        department: 'System Administration',
        permissions: ['all']
    });
    
    await adminProfile.save();
    return {
        firstName: adminProfile.firstName,
        lastName: adminProfile.lastName
    };
};


export const getModels = {
    getDoctorProfile,
    getPatientProfile
}
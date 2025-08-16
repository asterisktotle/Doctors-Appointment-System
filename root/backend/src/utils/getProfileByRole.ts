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

export const getProfileByRole = async (role: string, userId: string) => {
    switch (role) {
        case 'patient': 
            const patientProfile = await getPatientProfile(userId);
            
            if (!patientProfile) throw new Error('Patient profile not found');
            return {
                firstName: patientProfile.firstName,
                lastName: patientProfile.lastName
            };

        case 'doctor': 
            const doctorProfile = await getDoctorProfile(userId)
            
            if (!doctorProfile) throw new Error('Doctor profile not found');
            return {
                firstName: doctorProfile.firstName,
                lastName: doctorProfile.lastName,
                specialization: doctorProfile.specialization,
                customSpecialization: doctorProfile.customSpecialization,
                availability: doctorProfile.availability
            };

        case 'admin':
            return {
                    firstName: 'Admin',
                    lastName: 'User',
                    department: 'System Administration'
                };

        default: 
                throw new Error('Invalid user role')

    }
    
}
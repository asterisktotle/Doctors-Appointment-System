import { UserInterface } from "@/types/user.type";
import mongoose from "mongoose";
import { UserService } from "./user.service";
import { PatientModel } from "@/models/patient.model";
import { PatientInterface } from "@/types/patient.type";
import { DoctorInterface } from "@/types/doctor.type";
import { createPatientProfile } from "./patient.service";
import { createDoctorProfile } from "./doctor.service";

interface RegistrationData {
    userData: UserInterface
    profileData: PatientInterface | DoctorInterface
    userType: 'patient' | 'doctor'
}

const registerUserWithProfile = async (registrationData: RegistrationData) => {
    
    const session = await mongoose.startSession();

    try {
        const { 
            userData,
            profileData,
            userType
        } = registrationData

        session.startTransaction()

        // Create User 
        const user = await UserService.createUserAccount(
            userData,
            session
        )

        let profile;

        const profileDataWithId = {
            ...profileData,
            userId: userData._id || userData.id
        }
        // Create Profile based on role
        if (userType === 'doctor') {
            profile = await createDoctorProfile(
                profileDataWithId as DoctorInterface, 
                session
            );
        } else {
            profile = await createPatientProfile(
                profileDataWithId as PatientInterface, 
                session
            );
        }

        await session.commitTransaction();

        return {
            user: user,
            profile: profile,
            // add verification token
        }

        

    } catch (error) {
        throw error
    }
}
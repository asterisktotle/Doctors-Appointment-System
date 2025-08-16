import { env } from '@/config/env';
import { AdminModel } from '@/models/admin.model';
import { DoctorModel } from '@/models/doctor.model';
import { PatientModel } from '@/models/patient.model';
import { UserModel } from '@/models/user.model';
import { UserInterface } from '@/types/user.type';
import { createDefaultAdminProfile } from '@/utils/getModels';
import { isPasswordMatch } from '@/utils/hashedPassword.utils';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const createUserAccount = async (userData: UserInterface) => {
	// TODO:
	try {
		// Check if account is already created
		const isExistingUser = await UserModel.findOne({ email: userData.email });

		if (isExistingUser) {
			throw new Error('Email is already used');
		}

		const verificationToken = crypto.randomBytes(32).toString('hex');

		const user = new UserModel({
			...userData,
			verificationToken,
			isVerified: false,
		});

		await user.save();

		const userResponse = user.toJSON();

		return {
			user: userResponse,
			verificationToken, // use this to send email verification, remove in production
		};
	} catch (error) {
		throw error;
	}
};
const loginUserAccount = async (userData: UserInterface) => {
    try {
        
	    const isExistingUser = await UserModel.findOne({ email: userData.email }, '+password');

    

        // Check if email has no account
        if (!isExistingUser) {
            throw new Error('The email has no account')
        }

        let profile;
        
        // Admin login 
        if(isExistingUser.role === 'admin') {
            const adminProfile = await AdminModel.findOne({userId: isExistingUser._id})
            
            // Create admin account
            if(!adminProfile){
                profile = await createDefaultAdminProfile(isExistingUser._id.toString());
            }


        }

        const isPasswordCorrect = await isPasswordMatch(isExistingUser.password, userData.password)

        // Check hashed password
        if (!isPasswordCorrect) {
            throw new Error ('Incorrect password')
        }


        // User Data
        const user = {
            id: isExistingUser._id,
            email: isExistingUser.email,
            isVerified: isExistingUser.isVerified,
            role: isExistingUser.role,
        }
        // let profile = {firstName: '', lastName: '', }
            


        // Check user role and get profile data

        // Generate JWT Token
        const token = jwt.sign(
            { id: isExistingUser._id, role: isExistingUser.role},
            env.JWT_SECRET!,
            { expiresIn: '1h'}
        );

        
    

        return {
            token,
            user,
            profile,
        }
            


    } catch (error) {
        throw error
    }

};
const logoutUserAccount = async () => {
	// TODO:
	//
};

// Change password
// Change email to be added

export const UserService = {
	createUserAccount,
	loginUserAccount,
	logoutUserAccount,
};

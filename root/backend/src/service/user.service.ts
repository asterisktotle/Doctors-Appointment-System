import { env } from '@/config/env';
import { AdminModel } from '@/models/admin.model';
import { UserModel } from '@/models/user.model';
import { UserInterface } from '@/types/user.type';
import {
	createDefaultAdminProfile,
	getProfileByRole,
} from '@/utils/getProfileByRole';
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


// To Login, user must create a profile (patient/doctor)
const loginUserAccount = async (userData: UserInterface) => {
	try {
		const isExistingUser = await UserModel.findOne({ email: userData.email.trim() })
			.select('+password')
			.lean();

		// Check if email has no account
		if (!isExistingUser) {
			throw new Error('The email has no account');
		}

		let profile;

		// Admin login
		if (isExistingUser.role === 'admin') {
			const adminProfile = await AdminModel.findOne({
				userId: isExistingUser._id,
			});

			// Create admin account
			if (!adminProfile) {
				profile = await createDefaultAdminProfile(
					isExistingUser._id.toString()
				);
			} else {
				profile = {
					firstName: adminProfile.firstName,
					lastName: adminProfile.lastName,
				};
			}
		} else {
			profile = await getProfileByRole(
				isExistingUser.role,
				isExistingUser._id.toString()
			);
		}
		
		// Check account password
		if (!isExistingUser.password || !userData.password) {
			throw new Error('Password field not found');
		}

		const isPasswordCorrect = await isPasswordMatch(
			isExistingUser.password,
			userData.password.trim()
		);

		
		if (!isPasswordCorrect) {
			throw new Error('Incorrect password');
		}

		// Create User Data
		const user = {
			id: isExistingUser._id,
			email: isExistingUser.email,
			isVerified: isExistingUser.isVerified,
			role: isExistingUser.role,	
		};

		// Generate JWT Token
		const token = jwt.sign(
			{ id: isExistingUser._id, role: isExistingUser.role },
			env.JWT_SECRET!,
			{ expiresIn: '1h' }
		);

		return {
			token,
			user,
			profile,
		};
	} catch (error) {
		throw error;
	}
};

// Client Side Logout
const logoutUserAccount = async (userData: UserInterface) => {
	try {
		const isExistingUser = await UserModel.findOne({ email: userData.email.trim() })

		if (!isExistingUser) {
			throw new Error('The email has no account');
		}

		// remove token from local storage/ cookies

		return true;

	} catch (error) {
		throw error
	}
};

// Delete account
export const deleteUserAccount = async (userData: UserInterface) => {
  const deletedUser = await UserModel.findByIdAndDelete(userData.id);

  if (!deletedUser) {
    throw new Error("The email has no account");
  }

  return true;
};

// Change password
// Change email to be added



export const UserService = {
	createUserAccount,
	loginUserAccount,
	logoutUserAccount,
	deleteUserAccount,
};

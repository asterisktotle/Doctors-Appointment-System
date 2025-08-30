import { UserService } from '@/service/user.service';

const registerUser = async (req, res) => {
	try {
		const result = await UserService.createUserAccount(req.body);

		res.status(201).json({
			success: true,
			data: {
				user: result.user,
			},
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

const registerProfile = async (req, res) => {
	try {
		const result = await UserService.createUserProfile(req.body)

		res.status(200).json({
			success: true,
			data: {
				profile: result.profile
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
}

const logInUser = async (req, res) => {
	try {
		const result = await UserService.loginUserAccount(req.body);

		res.status(200).json({
			success: true,
			data: result,
			message: 'Login successful',
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

const logOutUser = async (req, res) => {
	try {
		const result = await UserService.logoutUserAccount(req.body);
	
		if(!result){
			res.status(400).json({
			success: false,
			message: 'Logout failed',
		});	
		}

		res.status(200).json({
			success: true,
			message: 'Logout successful',
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
}

const deleteUser = async (req, res) => {
	try {
		const isDeleted = await UserService.deleteUserAccount(req.body)

		if(!isDeleted) {
			res.status(400).json({
			success: false,
			message: 'Delete account failed',
			});	
		}

		res.status(200).json({
			success: true,
			message: 'Deleted successfully',
		});	
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
}

const editUser = async (req, res) => {
	try {
		const updatedProfile = await UserService.editBaseProfileInfo(req.body)
		

		if(!updatedProfile) {
			res.status(400).json({
			success: false,
			message: 'Update account failed',
			});	
		}
		
		res.status(200).json({
			success: true,
			message: 'Updated successfully',
			data: updatedProfile
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
}


const UserController = {
	registerUser,
	registerProfile,
	logInUser,
	logOutUser,
	deleteUser,
	editUser
};
export default UserController;
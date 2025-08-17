import { deleteUserAccount, UserService } from '@/service/user.service';

const registerUser = async (req, res) => {
	try {
		console.log('Request body:', req.body); // Add this line to debug
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
		const isDeleted = await deleteUserAccount(req.body)

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

export const UserController = {
	registerUser,
	logInUser,
	logOutUser,
	deleteUser
};

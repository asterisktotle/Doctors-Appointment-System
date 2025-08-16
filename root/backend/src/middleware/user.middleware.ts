import { UserInterface } from '@/types/user.type';

const validateUser = (req, res, next) => {
	const { email, password } = req.body;

	const error = [];

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

	if (!email || !emailRegex.test(email)) {
		error.push('Valid email is required');
	}

	if (!password || password.length < 8 || !passwordRegex.test(password)) {
		error.push(
			'Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol'
		);
	}

	if (error.length !== 0) {
		return res.status(400).json({
			success: false,
			message: 'Validation failed',
			error,
		});
	}

	next();
};

export const UserMiddleWare = {
	validateUser,
};

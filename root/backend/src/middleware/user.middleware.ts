import { ZodObject } from "zod";
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

// middlewares/validate.ts

	// export const validator = (schema: ZodObject) => (req, res, next) => {
	// const result = schema.safeParse(req.body);

	// if (!result.success) {
	// 	return res.status(400).json({ errors: result.error });
	// }

	// req.body = result.data;
	// next();
	// };


export const validator = (schema: ZodObject<any>) => (req: any, res: any, next: any) => {
  try {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      console.log('Validation failed:', result.error); // Debug log
      
      const zodErrors = result.error.issues || [];
    
      const errors = zodErrors.map(error => ({
        field: error.path.join('.') || 'unknown',
        message: error.message
      }));
      
      return res.status(400).json({ 
        success: false,
        errors: errors 
      });
    }
    
    req.body = result.data;
    next();
  } catch (error) {
    console.error('Validator error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal validation error'
    });
  }
};




export const UserMiddleWare = {
	validateUser,
};

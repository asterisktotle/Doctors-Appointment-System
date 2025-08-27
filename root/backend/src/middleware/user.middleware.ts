import { ZodObject } from "zod";
import { DoctorProfileSchema, PatientProfileSchema } from "./validation/profile.validation";
import { Request } from 'express';


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

interface ProfileValidationRequest extends Request {
  body: {
    userId: string;
    profile: any;
    role: 'patient' | 'doctor';
  };
}

export const profileValidation =  (req:ProfileValidationRequest, res: any, next: any) => {
  try {
    const {userId, profile, role} = req.body


    if (!userId) {
      return res.status(400).json({
        success: false,
        errors: [{ field: 'userId', message: 'User ID is required' }]
      });
    }

    if (!profile) {
      return res.status(400).json({
        success: false,
        errors: [{ field: 'profile', message: 'Profile data is required' }]
      });
    }

    if (!role || !['patient', 'doctor'].includes(role)) {
      return res.status(400).json({
        success: false,
        errors: [{ field: 'role', message: 'Role must be either "patient" or "doctor"' }]
      });
    }

   let result;
    switch (role) {
      case 'patient':
        result = PatientProfileSchema.safeParse(profile);
        break;
      case 'doctor':
        result = DoctorProfileSchema.safeParse(profile);
        break;
      default:
        return res.status(400).json({
          success: false,
          errors: [{ field: 'role', message: 'Invalid role specified' }]
        });
    }

    if(!result.success) {
      console.log(`${role} profile validation failed:`, result.error); // Debug log
      
      const zodErrors = result.error.issues || [];
    
      const errors = zodErrors.map(error => ({
        field: error.path.join('.') || 'unknown',
        message: error.message,
        code: error.code
      }))

        res.status(400).json({ 
        success: false,
        errors: errors 
      });
    }


    next()

  } catch (error) {
    console.error('Validator error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal validation error'
    });
  }
}



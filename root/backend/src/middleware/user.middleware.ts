import { ZodObject } from "zod";


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



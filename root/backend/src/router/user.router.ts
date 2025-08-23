import { Router } from 'express';
import { UserMiddleWare, validator } from '@/middleware/user.middleware';
import { UserController } from '@/controller/user.controller';
import { LoginSchema } from '@/middleware/validation/patient.validation';

// Controllers
const { registerUser, logInUser, logOutUser, deleteUser} = UserController;

// Middleware
const { validateUser } = UserMiddleWare;

const UserRouter = Router();

// Public routes
UserRouter.post('/register', validator(LoginSchema), registerUser);
UserRouter.post('/login', validator(LoginSchema), logInUser);
UserRouter.post('/logout', validateUser, logOutUser);
UserRouter.delete('/delete', validateUser, deleteUser )

export default UserRouter;
// Protected routes

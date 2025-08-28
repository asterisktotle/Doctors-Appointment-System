import { Router } from 'express';
import { profileValidation, validator } from '@/middleware/user.middleware';
import UserController from '@/controller/user.controller';
import { UserValidation } from '@/middleware/validation/user.validation';

// Controllers
const { registerUser,registerProfile, logInUser, logOutUser, deleteUser} = UserController;

// Middleware


const UserRouter = Router();

// Public routes
UserRouter.post('/register-user', validator(UserValidation), registerUser);
UserRouter.post('/register-profile', profileValidation, registerProfile )
UserRouter.post('/login', validator(UserValidation), logInUser);
UserRouter.post('/logout', logOutUser);
UserRouter.delete('/delete', validator(UserValidation), deleteUser )

export default UserRouter;
// Protected routes

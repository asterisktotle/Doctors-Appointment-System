import { Router } from 'express';
import { validator } from '@/middleware/user.middleware';
import UserController from '@/controller/user.controller';
import { UserValidation } from '@/middleware/validation/user.validation';

// Controllers
const { registerUser, logInUser, logOutUser, deleteUser} = UserController;

// Middleware


const UserRouter = Router();

// Public routes
UserRouter.post('/register', validator(UserValidation), registerUser);
UserRouter.post('/login', validator(UserValidation), logInUser);
UserRouter.post('/logout', logOutUser);
UserRouter.delete('/delete', validator(UserValidation), deleteUser )

export default UserRouter;
// Protected routes

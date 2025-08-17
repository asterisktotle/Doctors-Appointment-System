import { Router } from 'express';
import { UserMiddleWare } from '@/middleware/user.middleware';
import { UserController } from '@/controller/user.controller';

// Controllers
const { registerUser, logInUser, logOutUser } = UserController;

// Middleware
const { validateUser } = UserMiddleWare;

const UserRouter = Router();

// Public routes
UserRouter.post('/register', validateUser, registerUser);
UserRouter.post('/login', validateUser, logInUser);
UserRouter.post('/logout', validateUser, logOutUser);

export default UserRouter;
// Protected routes

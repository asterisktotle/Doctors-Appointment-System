import { Router } from "express";
import { UserMiddleWare } from "@/middleware/user.middleware";
import { UserService } from "@/service/user.service";

// Services
const {
    createUserAccount, 
    loginUserAccount,
    logoutUserAccount,
 } = UserService

// Middleware
const {validateUser} = UserMiddleWare


const UserRouter = Router()



// Public routes
UserRouter.post('/register',validateUser, createUserAccount)
UserRouter.post('/login', validateUser, loginUserAccount)


export default UserRouter
// Protected routes


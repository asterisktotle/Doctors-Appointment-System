import { Router } from "express";
import { UserMiddleWare } from "@/middleware/user.middleware";
import { UserService } from "@/service/user.service";
const {
    createUserAccount
 } = UserService
const {
    validateUser
} = UserMiddleWare


const UserRouter = Router()



// Public routes
UserRouter.post('/register',validateUser, createUserAccount)


export default UserRouter
// Protected routes


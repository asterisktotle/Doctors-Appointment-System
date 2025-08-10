import { Document } from "mongoose"


type UserRole = 'doctor'| 'patient' | 'admin'

export interface UserInterface extends Document {
    firstName: string
    email: string,
    password: string
    role: UserRole
    isVerified: boolean
    createdAt: Date;
    updatedAt: Date;
}
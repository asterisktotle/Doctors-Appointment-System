type UserRole = 'doctor'| 'patient' | 'admin'

export interface UserInterface  {
    firstName: string
    email: string,
    password: string
    role: UserRole
    isVerified: boolean
    createdAt: Date;
    updatedAt: Date;
}
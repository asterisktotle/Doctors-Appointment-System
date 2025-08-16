type UserRole = 'doctor'| 'patient' | 'admin'

export interface UserInterface  {
    id?: number
    email: string
    password?: string
    role: UserRole
    isVerified: boolean
    // isActive: boolean
    // lastActive: Date
    verificationToken?: string
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    createdAt: Date
    updatedAt: Date
}
import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserInterface } from '@/types/user.type'
import { email, lowercase, maxLength, minLength } from 'zod'
import { required } from 'zod/v4/core/util.cjs'

const userRole = ['doctor', 'patient', 'admin']

const UserSchema: UserInterface = new Schema(
    {
        firstName: {
            type: String,
            required: [true ,'First name is required'],
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            unique: true,
            trim: true,
            lowercase: true,

        },
        role: {
            type: String,
            enum: userRole,
            required: true
        },
        isVerified:{
            type: Boolean,
            required: true
        },
    },
    { timestamps: true}
)



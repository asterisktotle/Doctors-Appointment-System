import mongoose, { CallbackError, Schema} from 'mongoose'
import { UserInterface } from '../types/user.type';
import { hashPassword } from '@/utils/hashedPassword.utils';


const userRole = ['doctor', 'patient', 'admin']

const userSchema = new Schema<UserInterface>(
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
            default: 'patient',
            required: true
        },
        isVerified:{
            type: Boolean,
            default: false,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true
        }, 
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        }
    },
    { timestamps: true}
)

// Hash the password before saving to DB
userSchema.pre('save', async function (next){

    // isModified checks if the password is new or changed
    if(!this.isModified('password')) return next()

    try{
        this.password = await hashPassword(this.password)
        next();
    } catch(error){
        next(error as CallbackError)
    }
})


export const UserModel = mongoose.model('User', userSchema)

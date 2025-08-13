import { UserModel } from "@/models/user.model"
import { UserInterface } from "@/types/user.type"
import crypto from 'crypto'

const createUserAccount = async (userData: UserInterface) => {
// TODO:
    try {
        // Check if account is already created
        const isExistingUser = UserModel.findOne({email: userData.email})

        if(!isExistingUser) {
            throw new Error('Email is already used')
        }

        const verificationToken = crypto.randomBytes(32).toString('hex')
    
        const user = new UserModel({
            ...userData,
            verificationToken,
            isVerified: false
        })

        await user.save()

    } catch (error) {
        throw error
    }
    
}
const loginUserAccount = async () => {
   
}
const logoutUserAccount = async () => {
   // TODO:
    // 
}


// Change password 
// Change email to be added 
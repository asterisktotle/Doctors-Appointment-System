import { UserService } from "@/service/user.service"



const registerUser = async (req,res) => {
    try {
        const result = await UserService.createUserAccount(req.body)


        res.status(201).json({
            success: true,
            data: {
                user:result.user,

            }
        })
    } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
        });
    }
}

const logInUser = async (req, res) => {
    try {
        const result = await UserService.loginUserAccount(req.body)
        
        res.status(200).json({
            success: true,
            data: result,
            message: 'Login successful'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
} 

export const UserController = {
    registerUser,
    logInUser
}
import bcrypt from 'bcryptjs';

export const hashPassword  = async (plainPass: string) => {
    if(!plainPass || typeof plainPass !== 'string'){
        throw new Error('Password must be non-empty string')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPass,salt);
    return hash
}


export const isPasswordMatch = async (hashedPass: string, plainPass: string) => {
    try {
        if(!hashedPass || !plainPass) return false;

        return await bcrypt.compare(plainPass, hashedPass)

    }catch (error) {
        console.error('Password comparison error')
        return false
    }

}
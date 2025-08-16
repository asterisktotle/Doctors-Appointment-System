import mongoose from 'mongoose';

export interface AdminInterface {
    userId: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    department?: string;
    permissions?: string[];
    createdAt: Date;
    updatedAt: Date;
}


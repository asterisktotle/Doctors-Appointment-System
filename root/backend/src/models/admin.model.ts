import { AdminInterface } from "@/types/admin.type";
import { model, Schema } from "mongoose";


const adminSchema = new Schema<AdminInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        default: 'Admin'
    },
    lastName: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: 'System Administration'
    },
    permissions: [{
        type: String,
        enum: ['user_management', 'system_config', 'reports', 'all']
    }]
}, { timestamps: true });


export const AdminModel = model('Admin', adminSchema)
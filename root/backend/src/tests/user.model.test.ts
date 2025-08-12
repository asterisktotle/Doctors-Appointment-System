import { UserModel } from '../models/user.model';
import { UserInterface } from '../types/user.type';

// Use jest to test 
// Create a test user object
const testUser: UserInterface = new UserModel({
    email: 'john.doe@example.com',
    password: 'securepassword123',
    role: 'doctor',
    isVerified: true,
    verificationToken: 'Sn792nYDH0-1',
    createdAt: new Date(),
    updatedAt: new Date(),
});

// Log the test user object
console.log('Test User:', testUser);

// Access properties and methods

console.log('Email:', testUser.email);
console.log('Role:', testUser.role);
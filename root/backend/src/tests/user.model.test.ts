import { UserModel } from '../models/user.model';

// Use jest to test 
// Create a test user object
const testUser = new UserModel({
    firstName: 'John',
    email: 'john.doe@example.com',
    password: 'securepassword123',
    role: 'doctor',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});

// Log the test user object
console.log('Test User:', testUser);

// Access properties and methods
console.log('First Name:', testUser.firstName);
console.log('Email:', testUser.email);
console.log('Role:', testUser.role);
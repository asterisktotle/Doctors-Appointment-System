import { availableDays, medicalSpecializations } from '@/utils/constants';
import z from 'zod'

export const PatientProfileSchema = z.object({
  // userId: z.string().min(1, "User ID is required"),
  
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
    
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
    
  sex: z.enum(["Male", "Female", "Other"]),

  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Birth date must be in YYYY-MM-DD format")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate < today;
    }, "Birth date must be in the past"),
    
  address: z.object({
    street: z
      .string()
      .min(1, "Street address is required")
      .max(100, "Street address must be less than 100 characters"),
      
    city: z
      .string()
      .min(1, "City is required")
      .max(50, "City must be less than 50 characters"),
      
    state: z
      .string()
      .min(1, "State is required")
      .max(50, "State must be less than 50 characters"),
      
    zipCode: z
      .string()
      .min(3, "Zip code must be at least 3 characters")
      .max(10, "Zip code must be less than 10 characters"),
      
    country: z
      .string()
      .min(1, "Country is required")
      .max(50, "Country must be less than 50 characters")
  })
});


const availabilitySchema = z.object({
    days: z.array(z.enum(availableDays)),
    slots: z.array(z.string())
});

export const DoctorProfileSchema = PatientProfileSchema.extend({
  specialization: z.enum(medicalSpecializations).optional(),
  customSpecialization: z.string().trim().optional(),
    availability: z.array(availabilitySchema).default([])
}).refine((data) => {
    // If specialization is "other", customSpecialization is required
    if (data.specialization === 'Other' && !data.customSpecialization?.trim()) {
        return false;
    }
    return true;
}, {
    message: "Custom specialization is required when specialization is 'other'",
    path: ["customSpecialization"]
});
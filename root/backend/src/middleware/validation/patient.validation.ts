import { z } from "zod";



// export const LoginSchema = z.object({
//   email: z.email("Valid email is required"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
//       "Password must contain uppercase, lowercase, number, and symbol"
//     ),
// });

export const LoginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain uppercase, lowercase, number, and symbol"
    ),
});



export const PatientSchema = z.object({
  userId: z.string().min(1, "UserId is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  sex: z.enum(["Male", "Female", "Other"]),
  birthDate: z.string().transform((val) => new Date(val)),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
    zipCode: z.string().min(1),
    country: z.string().min(2),
  }),
});



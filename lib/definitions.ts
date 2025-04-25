import { z } from "zod";


//  Singup validation

export const SignupFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],  
  });

export type SignupFormValues = z.infer<typeof SignupFormSchema>;


//  login validation

export const SignInFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;



// Category Schema
export const categorySchema = z.object({
  name: z.string().min(2).max(50), 
});

export type categoryFormValues = z.infer<typeof categorySchema>;

// Menu Item Schema
export const menuItemSchema = z.object({
  name: z.string().min(2,'Name should be between 2-100 chars').max(100,'Name should be between 2-100 chars'), 
  description: z.string().min(5,'Description between 5-500 chars').max(500,'Description between 5-500 chars'), 
  price: z.number().positive('Must be a positive number'),  
  isInStock: z.boolean().default(true),  
  imageUrl: z.string().url('Must be a valid URL'), 
  isSpecial: z.boolean().default(false), 
  categories: z.string().uuid().optional(), 
  optionalCategory: z.string().uuid().optional(),
});


export type menuItemFormValue = z.infer<typeof menuItemSchema>;
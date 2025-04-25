'use server'

import { SignInFormSchema } from '@/lib/definitions'
import { createSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'
import { SignupFormSchema } from '@/lib/definitions'


export async function signIn(data: { email: string; password: string }) {
  // 1. Validate the form data
  const validationResult = SignInFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  // 2. Check if user exists
   const admin = await prisma.admin.findUnique({
     where: {email}
   })

  if (!admin) {
    return {
      errors: { email: ['No user found with this email'] },
    };
  }

  // 3. Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return {
      errors: { password: ['Incorrect password'] },
    };
  }

  // 4. create session
  await createSession(admin.email)
  // 5. Return success message
  return { success: true, message: 'Sign-in successful' };
}



export async function signup(data: { email: string; password: string; confirmPassword: string }) {
  // 1. Validate fields using the schema
  const validationResult = SignupFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password, confirmPassword } = validationResult.data;

  // 2. Check if passwords match
  if (password !== confirmPassword) {
    return {
      errors: { confirmPassword: ['Passwords do not match'] },
    };
  }

  // 3. check if user already exist
  const existingUser = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors : {email : ['Email is already in use']},
    }
  }

  // 4. Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. save new user
  await prisma.admin.create({
    data:{
      email,
      password:hashedPassword,
    }
  })

  return { success: true, message: 'User created successfully' };
}

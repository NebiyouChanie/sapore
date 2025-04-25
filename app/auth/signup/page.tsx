'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signup } from '@/lib/actions/auth'
import { SignupFormSchema, SignupFormValues } from '@/lib/definitions'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


export default function SignupForm() {

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  const router = useRouter()

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const result = await signup(data);
  
      if (result.errors) {
        // Show validation errors
        Object.entries(result.errors).forEach(([field, messages]) => {
          form.setError(field as keyof SignupFormValues, {
            type: 'manual',
            message: messages.join(", "),
          });
        });
        return;
      }
      
      router.push('/auth/signin')
      // Success toast
      toast.success(result.message || 'Signup successful!');
  
    } catch (error) { 
      console.log("~ onSubmit ~ error:", error)
      toast.error('Something went wrong! Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm" >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Enter your email and password to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            
            <Link href="/admin" className="cursor-pointer underline underline-offset-4">
              Go Back To Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

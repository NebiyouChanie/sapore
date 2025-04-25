"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ClockIcon, MessageSquare, Phone, User, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define validation schema
const formSchema = z.object({
  name: z.string().trim().min(1, "First Name is required"),
  email: z.string().trim().email("Email is required."),
  phoneNumber:  z.string().trim()
  .min(10, "Phone Number is required")
  .regex(/^(09|07)\d{8}$|^\+251(9|7)\d{8}$/, {
    message: "Phone number must start with 09, 07, or +251 and be valid",
  }),
  numberOfGuests: z.coerce.number().min(1, "At least 1 guest is required"),
  date: z.string().min(1, "Date is required").refine((val) => new Date(val) > new Date(), {
    message: "Date must be in the future",
  }),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

// Infer the type for the form data
type FormData = z.infer<typeof formSchema>;

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with useForm
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      numberOfGuests: 1,
      date: "",
      time: "",
      message: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Format phone number if it starts with "09" || "07"
      if (data.phoneNumber.startsWith("09") || data.phoneNumber.startsWith("07")) {
        data.phoneNumber = "+251" + data.phoneNumber.slice(1);
      }

      // Send data to the API
      const response = await fetch(`/api/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

       if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Request failed"}`);
        return;
      }

      toast.success("Reservation request submitted successfully!");
      reset();  
    } catch (error) {
      console.log("~ onSubmit ~ error:", error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between mt-10">
        <div className="flex items-center">
          <div>
            <h1 className="text-3xl font-bold">Add New Reservation</h1>
            <p className="text-muted-foreground">Create a new reservation for a customer</p>
          </div>
        </div>
      </div>

      <Card className="border-none p-0 ">
        <CardHeader className="bg-muted/70 px-6 py-4 rounded-t-xl">
          <CardTitle className="text-xl font-medium">Reservation Details</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-2 lg:max-w-[500px]">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Abebe" {...field} className="pl-10 bg-background" disabled={isSubmitting} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                         Email  
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="abc@gmail.com" {...field} className="pl-10 bg-background" disabled={isSubmitting} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number */}
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="tel" placeholder="0912 345 678" {...field} className="pl-10 bg-background" disabled={isSubmitting} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number of Guests */}
                <FormField
                  control={control}
                  name="numberOfGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Number of Guests <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="number" {...field} className="pl-10 bg-background" min={1} disabled={isSubmitting} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="date" {...field} className="pl-10 bg-background w-fit" disabled={isSubmitting} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Time */}
                <FormField
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Time <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="time" {...field} className="pl-10 bg-background w-fit" disabled={isSubmitting} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Additional Notes <span className="text-muted-foreground">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          placeholder="Special requests, dietary requirements, or preferred seating..."
                          {...field}
                          className="min-h-[100px] pl-10 bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4 lg:max-w-[500px]">
          <Button variant="outline" onClick={() => reset()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting} className="min-w-[150px]">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                Processing...
              </span>
            ) : (
              "Create Reservation"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number is required")
    .regex(/^(09|07)\d{8}$|^\+251(9|7)\d{8}$/, {
      message: "Phone number must start with 09, 07, or +251 and be valid",
    }),
  numberOfGuests: z.coerce.number().min(1, "At least 1 guest is required"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in the future",
    }),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { handleSubmit, register, reset, formState: { errors } } = form;

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      if (data.phoneNumber.startsWith("09") || data.phoneNumber.startsWith("07")) {
        data.phoneNumber = "+251" + data.phoneNumber.slice(1);
      }

      const response = await fetch(`/api/reservations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      console.log(" ~ onSubmit ~ error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-black pt-12 px-6 pb-16">
      <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-12 text-center">Book a Table</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-500'}`}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-500'}`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              {...register("date")}
              type="date"
              className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-500'}`}
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
          </div>
          <div className="relative">
            <input
              {...register("time")}
              type="time"
              className={`w-full p-3 border ${errors.time ? 'border-red-500' : 'border-gray-500'}`}
            />
            {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
          </div>
        </div>
        <div className="relative">
          <input
            {...register("numberOfGuests", { valueAsNumber: true })}
            type="number"
            placeholder="Number of guests"
            className={`w-full p-3 border ${errors.numberOfGuests ? 'border-red-500' : 'border-gray-500'}`}
          />
          {errors.numberOfGuests && <span className="text-red-500 text-sm">{errors.numberOfGuests.message}</span>}
        </div>
        <div className="relative">
          <input
            {...register("phoneNumber")}
            type="tel"
            placeholder="Phone Number"
            className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-500'}`}
          />
          {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
        </div>
        <div className="relative">
          <textarea
            {...register("message")}
            placeholder="Special requests"
            rows={4}
            className="w-full p-3 border border-gray-500"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black font-medium hover:bg-gray-800 text-white py-2 px-6 text-sm transition-colors"
          >
            {isSubmitting ? "Booking..." : "BOOK NOW"}
          </button>
        </div>
      </form>
    </div>
  );
}

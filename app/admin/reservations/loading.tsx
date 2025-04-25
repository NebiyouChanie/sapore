"use client";

import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn/ui for Skeleton

export default function Loading() {
  return (
    <div className="p-6">
      {/* Date Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-[240px]" /> {/* Date Picker */}
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-[240px]" /> {/* Date Picker */}
        </div>
        <div className="flex items-end">
          <Skeleton className="h-10 w-24" /> {/* Clear Dates Button */}
        </div>
      </div>

      {/* Search and Columns Dropdown Skeleton */}
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-64" /> {/* Search Input */}
        <Skeleton className="h-10 w-24 ml-auto" /> {/* Columns Dropdown */}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <div className="bg-tableHeader text-[#fffff]">
          <Skeleton className="h-12 w-full" /> {/* Table Header */}
        </div>
        <div className="p-4 space-y-4">
          {[...Array(7)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />  
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-10 w-24" /> {/* Previous Button */}
        <Skeleton className="h-10 w-24" /> {/* Next Button */}
        <Skeleton className="h-10 w-[100px]" /> {/* Page Size Selector */}
      </div>
    </div>
  );
}
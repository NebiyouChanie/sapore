import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateReservationLoading() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between mt-10">
        <div className="flex items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-64" /> {/* Subtitle */}
          </div>
        </div>
      </div>

      <Card className="border-none p-0">
        <CardHeader className="bg-muted/70 px-6 py-4 rounded-t-xl">
          <Skeleton className="h-6 w-48" /> {/* Card Title */}
        </CardHeader>
        <CardContent className="px-6 py-2 lg:max-w-[500px]">
          <div className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>

            {/* Number of Guests and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
              </div>
            </div>

            {/* Time */}
            <div>
              <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>

            {/* Additional Notes */}
            <div>
              <Skeleton className="h-4 w-48 mb-2" /> {/* Label */}
              <Skeleton className="h-24 w-full" /> {/* Textarea */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4 lg:max-w-[500px]">
          <Skeleton className="h-10 w-24" /> {/* Cancel Button */}
          <Skeleton className="h-10 w-48" /> {/* Update Button */}
        </CardFooter>
      </Card>
    </div>
  );
}
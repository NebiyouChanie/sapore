// loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-10">
        {/* Basic Information Section */}
        <div className="bg-primary/5 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gradient-to-br from-muted/20 to-muted/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Menu Placement Section */}
        <div className="bg-gradient-to-br from-muted/20 to-muted/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Image Upload and Preview Section */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>

          <div className="bg-white rounded-xl p-6 border border-muted/20">
            <div className="flex items-center space-x-3 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="mt-auto pt-4">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
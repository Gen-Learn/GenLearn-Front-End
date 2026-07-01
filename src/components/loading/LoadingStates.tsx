import { Card } from '../ui';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function CourseCardSkeleton() {
  return (
    <Card className="!p-0 overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </Card>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function VideoPlayerSkeleton() {
  return (
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
      <Skeleton className="absolute inset-0 bg-gray-800" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-1 flex-1 rounded bg-gray-700" />
          <Skeleton className="h-6 w-12 bg-gray-700" />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded bg-gray-700" />
            <Skeleton className="h-8 w-8 rounded bg-gray-700" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded bg-gray-700" />
            <Skeleton className="h-8 w-8 rounded bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuizLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <div className="space-y-3 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function DashboardWidgetSkeleton({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </Card>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="w-80 bg-white border-r border-gray-100 p-4 space-y-4">
      <Skeleton className="h-6 w-32 mb-6" />
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="pl-4 space-y-2">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-10 w-16" />
          </Card>
        ))}
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card>
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 animate-pulse mx-auto mb-6" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}

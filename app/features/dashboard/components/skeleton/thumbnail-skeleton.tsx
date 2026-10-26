import { Skeleton, SkeletonImage, SkeletonText } from "../../../../components/ui/skeleton";

export default function ThumbnailSkeleton() {
    return (
      <div className="relative flex w-full h-150 rounded-md">
        <SkeletonImage />
        <Skeleton className="h-8 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-14" /> {/* rating badge */}
          <Skeleton className="h-4 w-20" /> {/* release date */}
          <Skeleton className="h-4 w-16" /> {/* genre */}
          <Skeleton className="h-4 w-16" /> {/* genre */}
        </div>
        <SkeletonText lines={4} />
      </div>
    );
}
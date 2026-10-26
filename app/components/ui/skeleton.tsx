import type { HTMLAttributes } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* 1. The primitive: every skeleton is built from this */
export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cx("animate-pulse rounded-md bg-white/10", className)}
      {...props}
    />
  );
}

/* 2. Reusable shapes */
export function SkeletonText({
  lines = 3,
  lastLineWidth = "w-2/3",
  className,
}: {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cx("h-3", i === lines - 1 ? lastLineWidth : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({
  className = "size-10",
}: {
  className?: string;
}) {
  return <Skeleton className={cx("rounded-full", className)} />;
}

export function SkeletonImage({
  className = "aspect-video w-full",
}: {
  className?: string;
}) {
  return <Skeleton className={cx("rounded-lg", className)} />;
}

/* 3. Page-specific skeletons, composed from the shapes above */
export function ThumbnailSkeleton() {
  return <SkeletonImage />;
}

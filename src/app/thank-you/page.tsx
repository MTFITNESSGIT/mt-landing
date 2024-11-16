import ThankYou from "@/components/ThankYou";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 w-full bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
          <Skeleton className="w-full h-full" />
        </div>
      }
    >
      <ThankYou />
    </Suspense>
  );
}

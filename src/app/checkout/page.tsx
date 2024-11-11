// app/checkout/page.tsx
import CheckoutClient from "@/components/CheckoutClient";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 w-full bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
          <Skeleton className="w-full h-full" />
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}

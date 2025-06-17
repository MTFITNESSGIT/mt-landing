"use client";
import { PaymentTable } from "@/components/payments/paymentTable";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useUsers } from "@/hooks/usePayments";
import { sendPlanRequest } from "@/utils/sendPlanRequest";
import { LogOut } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { data, isLoading, page, setPage, totalPages, error } = useUsers();

  const handleSendPlan = async (paymentId: string) => {
    try {
      await sendPlanRequest(paymentId);
      toast.success("El plan ha sido enviado exitosamente.");
    } catch (error) {
      toast.error("Hubo un problema al enviar el plan.");

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Navigation Header */}
      <nav className="text-black shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Exit Button */}
            <Button
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6">
        <div className="bg-white rounded-md shadow-sm p-4 w-full">
          <PaymentTable
            data={data}
            isLoading={isLoading}
            error={error}
            onSendPlan={handleSendPlan} // Pass down the function to the table
          />
        </div>

        {!isLoading && data && totalPages > 1 && (
          <div className="mt-4 flex justify-center text-black">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(page - 1)}
                    className={
                      page <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    className={
                      page >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

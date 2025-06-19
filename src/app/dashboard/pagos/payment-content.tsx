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
import { withAuth } from "@/components/withAuth";
import { useUsers } from "@/hooks/usePayments";
import { sendPlanRequest } from "@/utils/sendPlanRequest";
import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function PaymentsContent() {
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
    <div className="h-full w-full bg-white">
      {/* Navigation Header */}
      <nav className=" sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 text-black">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al Dashboard</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                Tabla de Pagos
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Pagos
          </h1>
          <p className="text-gray-600">
            Administra y envía planes a tus clientes
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-6">
          <PaymentTable
            data={data}
            isLoading={isLoading}
            error={error}
            onSendPlan={handleSendPlan}
          />
        </div>

        {!isLoading && data && totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(page - 1)}
                    className={
                      page <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:bg-blue-50"
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
                        className="cursor-pointer hover:bg-blue-50"
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
                        : "cursor-pointer hover:bg-blue-50"
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
}

export default withAuth(PaymentsContent);

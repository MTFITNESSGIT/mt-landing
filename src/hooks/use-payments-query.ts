import { PaginatedPaymentsResponse } from "@/types/payments.types";
import { useQuery } from "@tanstack/react-query";

export function usePaymentQuery(page = 1, limit = 10, search: string = "") {
  return useQuery<PaginatedPaymentsResponse, Error>({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const response = await fetch(
        `/api/payments?search=${search}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });
}

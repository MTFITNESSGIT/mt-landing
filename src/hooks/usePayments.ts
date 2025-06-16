import { useState } from "react";
import { usePaymentQuery } from "./use-payments-query";

type UseUsersOptions = {
  initialPage?: number;
  initialLimit?: number;
  initialFilter?: string;
};

export const useUsers = (options?: UseUsersOptions) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(options?.initialPage || 1);
  const [limit, setLimit] = useState(options?.initialLimit || 10);

  const {
    data: queryData,
    isLoading,
    error,
  } = usePaymentQuery(page, limit, searchQuery);

  return {
    data: queryData?.data || [],
    isLoading,
    error: error as Error | null,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    setLimit,
    totalPages: queryData?.pagination.totalPages || 1,
    total: queryData?.pagination.total || 0,
  };
};

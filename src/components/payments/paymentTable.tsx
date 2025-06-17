// components/payments/usersTable.tsx

import {
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";

interface PaymentTableProps {
  data: any[];
  isLoading: boolean;
  error: Error | null;
  onSendPlan: (paymentId: string) => Promise<void>;
}

export const PaymentTable = ({
  data,
  isLoading,
  error,
  onSendPlan,
}: PaymentTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data || [],
    columns: Columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onSendPlan,
    },
  });

  return (
    <DataTable
      columns={Columns}
      data={data}
      table={table}
      isLoading={isLoading}
      error={error}
    />
  );
};

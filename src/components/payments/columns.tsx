"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import Chip from "../chip";
import { IColumns } from "@/types/payments.types";

interface CustomTableMeta {
  onSendPlan: (paymentId: string) => void;
}

export const Columns: ColumnDef<IColumns>[] = [
  {
    id: "paymentId",
    header: "ID de pago",
    cell: ({ row }) => {
      const id = row.original.paymentId;
      return id;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return email;
    },
  },
  {
    accessorKey: "date_created",
    header: "Fecha de creación",
    cell: ({ row }) => {
      const date = row.original.date_created;
      return new Date(date).toLocaleDateString("es-ES");
    },
  },
  {
    accessorKey: "date_approved",
    header: "Fecha de aprobación",
    cell: ({ row }) => {
      const date = row.original.date_approved;
      return new Date(date).toLocaleDateString("es-ES");
    },
  },
  {
    accessorKey: "status",
    header: "Estado del usuario",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Chip status={status} />;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row, table }) => {
      const paymentId = row.original.paymentId;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            size="sm"
            onClick={() =>
              (table.options.meta as CustomTableMeta).onSendPlan(paymentId)
            }
          >
            Enviar Plan
          </Button>
        </div>
      );
    },
  },
];

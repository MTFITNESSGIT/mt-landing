"use client";

import { useUsers } from "@/hooks/useUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UsersTable = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Número de telefono</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((payment: any) => (
          <TableRow
            key={payment._id}
            className="data-[state=selected]:bg-muted text-black"
          >
            <TableCell>{payment.name}</TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell>
              {payment.phone || "No hay número de telefono registrado"}
            </TableCell>
            <TableCell>${payment.amount.toFixed(2)}</TableCell>
            <TableCell>{payment.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

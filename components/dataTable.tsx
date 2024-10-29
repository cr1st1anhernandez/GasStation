"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";

const columns = [
  {
    key: "tipoAutomovil",
    label: "TIPO DE AUTOMOVIL",
  },
  {
    key: "nBomba",
    label: "N BOMBA",
  },
  {
    key: "horaInicio",
    label: "HORA INICIO",
  },
  {
    key: "horaFinalizacion",
    label: "HORA FINALIZACION",
  },
  {
    key: "tipoPago",
    label: "TIPO DE PAGO",
  },
  {
    key: "tipoProducto",
    label: "TIPO DE PRODUCTO",
  },
  {
    key: "litros",
    label: "LITROS",
  },
];

interface DataTableProps {
  data: any[];
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

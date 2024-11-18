'use client'
import { Pagination } from '@nextui-org/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/table'
import React from 'react'

import { formatDate } from '@/utils/format'

interface DataTableProps {
  data: any[]
  columns: { key: string; label: string }[]
  rows: number
}

const getCellContent = (item: any, key: string) => {
  const value = getKeyValue(item, key)

  if (key === 'HoraLlegada' || key === 'HoraSalida') {
    return formatDate(value)
  }

  return value
}

export default function PaginationTable({
  data,
  columns,
  rows,
}: DataTableProps) {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = rows
  const pages = Math.ceil(data.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, data])

  return (
    <>
      <Table aria-label="Table with client-side pagination">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {getCellContent(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Pagination
          isCompact
          showControls
          color="primary"
          page={page}
          total={pages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  )
}

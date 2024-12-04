import { dataColumns } from '@/components/constants'
import PaginationTable from '@/components/paginationTable'
import { useData } from '@/providers/dataContext'

export default function Data() {
  const { data } = useData()

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-semibold">Datos obtenidos del archivo</h2>
      <PaginationTable columns={dataColumns} data={data} rows={10} />
    </div>
  )
}

'use client'
import Papa from 'papaparse'

import { FileIcon } from '@/components/icons'
import { Data } from '@/types'

interface CSVButtonProps {
  setData: (data: Data[]) => void
  dataRef: React.RefObject<HTMLDivElement>
}

export default function CSVButton({ setData, dataRef }: CSVButtonProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dataRef.current) {
      dataRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const file = e.target.files?.[0]

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result: any) => {
          setData(result.data)
        },
      })
    }
  }

  return (
    <div>
      <label
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-500 active:scale-95"
        htmlFor="csvInput"
        style={{
          boxShadow: '0px 4px 15px rgba(13, 148, 136, 0.6)',
        }}
      >
        <FileIcon />
        Importar CSV
      </label>
      <input
        accept=".csv"
        id="csvInput"
        style={{ display: 'none' }}
        type="file"
        onChange={handleFile}
      />
    </div>
  )
}

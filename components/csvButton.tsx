'use client'
import { FileIcon } from '@/components/icons'
import { useCsv } from '@/hooks/useCsv'

export default function CSVButton() {
  const { handleFile } = useCsv()

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

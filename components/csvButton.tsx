"use client";
import { FileIcon } from "@/components/icons";
import Papa from "papaparse";

interface CSVButtonProps {
  setData: (data: any[]) => void;
  datosRef: any;
}

const data = [
  {
    key: 1,
    tipoAutomovil: "Sedan",
    nBomba: 1,
    horaInicio: "10:00",
    horaFinalizacion: "10:30",
    tipoPago: "Efectivo",
    tipoProducto: "Regular",
    litros: 10,
  },
  {
    key: 2,
    tipoAutomovil: "Sedan",
    nBomba: 2,
    horaInicio: "10:00",
    horaFinalizacion: "10:30",
    tipoPago: "Efectivo",
    tipoProducto: "Regular",
    litros: 10,
  },
];

export default function CSVButton({ setData, datosRef }: CSVButtonProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    datosRef.current.scrollIntoView({ behavior: "smooth" });

    setData(data);
    const file = e.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result: any) => {
          setData(result.data);
        },
      });
    }
  };

  return (
    <div>
      <label
        className="text-white cursor-pointer py-2 px-4 rounded-full flex items-center justify-center gap-2 
             transition-all duration-300 ease-in-out bg-teal-600 shadow-md 
             hover:bg-teal-500 hover:scale-105 active:scale-95"
        htmlFor="csvInput"
        style={{
          boxShadow: "0px 4px 15px rgba(13, 148, 136, 0.6)",
        }}
      >
        <FileIcon />
        Importar CSV
      </label>
      <input
        accept=".csv"
        id="csvInput"
        style={{ display: "none" }}
        type="file"
        onChange={handleFile}
      />
    </div>
  );
}

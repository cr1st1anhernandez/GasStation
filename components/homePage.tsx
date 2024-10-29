"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { useRef, useState } from "react";

import CSVButton from "@/components/csvButton";
import DataTable from "@/components/dataTable";
import { DownloadIcon, GithubIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { TimeServiceChart } from "@/components/timeServiceChart";

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);
  const datosRef = useRef(null);

  return (
    <>
      <section className="flex flex-col w-full items-center justify-center gap-4 md:py-10">
        <section className="flex w-full flex-col gap-4">
          <div className="inline-block max-w-xl text-center justify-center">
            <span className={title()}>Mejora y&nbsp;</span>
            <span className={title({ color: "teal" })}>Optimiza&nbsp;</span>
            <br />
            <span className={title()}>
              los tiempos de espera
              <br />
              en gasolineras.
            </span>
          </div>
          <div className="grid grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-4">
            <CSVButton setData={setData} datosRef={datosRef} />{" "}
            <Link
              isExternal
              className={`${buttonStyles({ variant: "bordered", radius: "full" })} hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out`}
              href="https://github.com/cr1st1anhernandez/GasStation"
            >
              <GithubIcon size={20} />
              GitHub
            </Link>
            <div className="md:col-span-2 md:flex justify-center items-center text-gray-600">
              <Snippet
                className="w-full md:w-fit flex justify-center items-center"
                hideCopyButton
                hideSymbol
                variant="bordered"
              >
                <Link
                  download
                  showAnchorIcon
                  anchorIcon={<DownloadIcon />}
                  href="/registro_gasolina.csv"
                >
                  Archivo de ejemplo
                </Link>
              </Snippet>
            </div>
          </div>
        </section>
        <section
          ref={datosRef}
          id="datos"
          className="flex w-full flex-col gap-4"
        >
          {data.length ? (
            <>
              <div className="w-full flex flex-col pt-24 gap-4">
                <h2 className="text-2xl font-semibold">Tiempo de servicio</h2>
                <TimeServiceChart />
              </div>
              <h2 className="text-2xl font-semibold">Datos</h2>
              <DataTable data={data} />
            </>
          ) : null}
        </section>
      </section>
    </>
  );
}

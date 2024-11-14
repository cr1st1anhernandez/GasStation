'use client'
import { Link } from '@nextui-org/link'
import { Snippet } from '@nextui-org/snippet'
import { button as buttonStyles } from '@nextui-org/theme'

import CSVButton from '@/components/csvButton'
import { DownloadIcon, GithubIcon } from '@/components/icons'
import { title } from '@/components/primitives'
import { Data } from '@/types'
interface MainSectionProps {
  dataRef: React.RefObject<HTMLDivElement>
  setData: (data: Data[]) => void
}
export default function MainSection({ dataRef, setData }: MainSectionProps) {
  return (
    <>
      <div className="inline-block max-w-xl justify-center text-center">
        <span className={title()}>Mejora y&nbsp;</span>
        <span className={title({ color: 'teal' })}>Optimiza&nbsp;</span>
        <br />
        <span className={title()}>
          los tiempos de espera
          <br />
          en gasolineras.
        </span>
      </div>
      <div className="grid grid-rows-3 gap-4 md:grid-cols-2 md:grid-rows-2">
        <CSVButton dataRef={dataRef} setData={setData} />
        <Link
          isExternal
          className={`${buttonStyles({ variant: 'bordered', radius: 'full' })} rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
          href="https://github.com/cr1st1anhernandez/GasStation"
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
        <div className="items-center justify-center text-gray-600 md:col-span-2 md:flex">
          <Snippet
            hideCopyButton
            hideSymbol
            className="flex w-full items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 md:w-fit"
            variant="bordered"
          >
            <Link
              download
              showAnchorIcon
              anchorIcon={<DownloadIcon />}
              className="text-gray-600"
              href="/registro_gasolina.csv"
            >
              Archivo de ejemplo
            </Link>
          </Snippet>
        </div>
      </div>
    </>
  )
}

'use client'
import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'

import { title } from '@/components/constants'
import { GithubIcon } from '@/components/icons'
export default function Main() {
  return (
    <section className="flex flex-col gap-4 items-center">
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
      <Link
        isExternal
        className={`${buttonStyles({ variant: 'bordered', radius: 'full' })} rounded-lg transition-all duration-300 ease-in-out w-fit hover:scale-105 active:scale-95`}
        href="https://github.com/cr1st1anhernandez/GasStation"
      >
        <GithubIcon size={20} />
        GitHub
      </Link>
    </section>
  )
}

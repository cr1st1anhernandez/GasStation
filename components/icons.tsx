import * as React from 'react'

import { IconSvgProps } from '@/types'

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    stroke="#0e877d"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

export const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#e11d48'}
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 14.998V16.998M17.009 18.998H17M22 16.998C22 19.7594 19.7614 21.998 17 21.998C14.2386 21.998 12 19.7594 12 16.998C12 14.2366 14.2386 11.998 17 11.998C19.7614 11.998 22 14.2366 22 16.998Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M20.232 10.054C20.712 9.51405 21.54 8.69805 21.4958 8.36573C21.5298 8.04251 21.3548 7.73888 21.0049 7.13163L20.5114 6.27503C20.1381 5.6272 19.9514 5.30328 19.6338 5.17412C19.3163 5.04495 18.9571 5.14688 18.2388 5.35072L17.0185 5.69442C16.5599 5.80017 16.0788 5.74018 15.66 5.52503L15.3231 5.33066C14.9641 5.10067 14.6879 4.76157 14.535 4.36298L14.201 3.36559C13.9815 2.70558 13.8717 2.37557 13.6103 2.18681C13.3489 1.99805 13.0017 1.99805 12.3074 1.99805H11.1926C10.4982 1.99805 10.151 1.99805 9.88973 2.18681C9.62833 2.37557 9.51853 2.70558 9.29893 3.36559L8.96503 4.36298C8.81213 4.76157 8.53593 5.10067 8.17683 5.33066L7.83993 5.52503C7.42123 5.74018 6.94003 5.80017 6.48143 5.69442L5.26124 5.35072C4.54294 5.14688 4.18374 5.04495 3.86614 5.17412C3.54854 5.30328 3.36194 5.6272 2.98864 6.27503L2.49504 7.13163C2.14515 7.73888 1.97025 8.04251 2.00415 8.36573C2.03815 8.68895 2.27235 8.94942 2.74074 9.47036L3.77184 10.623C4.02374 10.942 4.20274 11.498 4.20274 11.9978C4.20274 12.498 4.02384 13.0538 3.77184 13.3729L2.74074 14.5256C2.27235 15.0465 2.03815 15.307 2.00415 15.6302C1.97025 15.9535 2.14515 16.2571 2.49504 16.8643L2.98864 17.7209C3.36194 18.3687 3.54854 18.6927 3.86614 18.8218C4.18374 18.951 4.54294 18.8491 5.26124 18.6452L6.48143 18.3015C6.94013 18.1957 7.42133 18.2558 7.84013 18.471L8.17693 18.6654C8.53603 18.8954 8.81213 19.2344 8.96493 19.633L9.29893 20.6305C9.51853 21.2905 9.63993 21.6336 9.84 21.778C9.9 21.8214 10.14 22.018 10.728 22"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M14.1599 9.44605C13.3199 8.76205 12.6599 8.49805 11.6999 8.49805C9.89986 8.52205 8.25586 10.009 8.25586 11.942C8.25586 13.0077 8.57986 13.682 9.19186 14.39"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
)

export const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 16H12.009"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M12 13V8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M15.1528 4.28405C13.9789 3.84839 13.4577 2.10473 12.1198 2.00447C12.0403 1.99851 11.9603 1.99851 11.8808 2.00447C10.5429 2.10474 10.0217 3.84829 8.8478 4.28405C7.60482 4.74524 5.90521 3.79988 4.85272 4.85239C3.83967 5.86542 4.73613 7.62993 4.28438 8.84747C3.82256 10.0915 1.89134 10.6061 2.0048 12.1195C2.10506 13.4574 3.84872 13.9786 4.28438 15.1525C4.73615 16.37 3.83962 18.1346 4.85272 19.1476C5.90506 20.2001 7.60478 19.2551 8.8478 19.7159C10.0214 20.1522 10.5431 21.8954 11.8808 21.9955C11.9603 22.0015 12.0403 22.0015 12.1198 21.9955C13.4575 21.8954 13.9793 20.1521 15.1528 19.7159C16.3704 19.2645 18.1351 20.1607 19.1479 19.1476C20.2352 18.0605 19.1876 16.2981 19.762 15.042C20.2929 13.8855 22.1063 13.3439 21.9958 11.8805C21.8957 10.5428 20.1525 10.021 19.7162 8.84747C19.2554 7.60445 20.2004 5.90473 19.1479 4.85239C18.0955 3.79983 16.3958 4.74527 15.1528 4.28405Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#ffffff'}
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 7L16 7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M8 11L12 11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

export const CheckmarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#0d9488'}
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12.5L10.5 15L16 9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#fff'}
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
)

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
)

export const CancelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#afb4ba'}
    fill={'none'}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
)

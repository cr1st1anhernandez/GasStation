import * as React from 'react';

import { IconSvgProps } from '@/types';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#0d9488'}
    fill={'none'}
    height={24}
    viewBox='0 0 24 24'
    width={24}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M10.1115 4.5H8C6.11438 4.5 5.17157 4.5 4.58579 5.08579C4 5.67157 4 6.61438 4 8.5V16C4 18.8284 4 20.2426 4.87868 21.1213C5.75736 22 7.17157 22 10 22H14C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V13.4443C20 11.0386 20 9.83582 19.4026 8.86921C18.8052 7.9026 17.7294 7.36469 15.5777 6.28885L13.6892 5.34458C12.8484 4.9242 12.428 4.71401 11.9747 4.607C11.5215 4.5 11.0515 4.5 10.1115 4.5Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M12 18C13.1046 18 14 17.1605 14 16.125C14 14.875 12 13 12 13C12 13 10 14.875 10 16.125C10 17.1605 10.8954 18 12 18Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M12.5 8L16.5 10'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M6 4.5V3.75C6 3.04777 6 2.69665 6.16853 2.44443C6.24149 2.33524 6.33524 2.24149 6.44443 2.16853C6.69665 2 7.04777 2 7.75 2C8.45223 2 8.80335 2 9.05557 2.16853C9.16476 2.24149 9.25851 2.33524 9.33147 2.44443C9.5 2.69665 9.5 3.04777 9.5 3.75V4.5'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </svg>
);

export const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#ffffff'}
    fill={'none'}
    height={24}
    viewBox='0 0 24 24'
    width={24}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M8 7L16 7'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M8 11L12 11'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={'#6f7782'}
    fill={'none'}
    height={24}
    viewBox='0 0 24 24'
    width={24}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path
      d='M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </svg>
);

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox='0 0 24 24'
      width={size || width}
      {...props}
    >
      <path
        clipRule='evenodd'
        d='M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height={size || height}
    role='presentation'
    viewBox='0 0 24 24'
    width={size || width}
    {...props}
  >
    <path
      d='M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z'
      fill='currentColor'
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height={size || height}
    role='presentation'
    viewBox='0 0 24 24'
    width={size || width}
    {...props}
  >
    <g fill='currentColor'>
      <path d='M19 12a7 7 0 11-7-7 7 7 0 017 7z' />
      <path d='M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z' />
    </g>
  </svg>
);

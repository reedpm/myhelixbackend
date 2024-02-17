import * as React from 'react';
const SvgFriendsOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <g filter="url(#friendsOutline_svg__a)">
      <path
        fill="#fff"
        d="M26.625 15.994a4.463 4.463 0 0 0-5.434-7.07 4.463 4.463 0 0 0-.316 7.07q-.3.154-.58.34a8.04 8.04 0 0 0-3.858-3.847A6.248 6.248 0 1 0 9.293 2.24a6.248 6.248 0 0 0 .333 10.246A8.04 8.04 0 0 0 5 19.752v5.355a.89.89 0 0 0 .893.893h23.214a.893.893 0 0 0 .893-.893v-3.57a6.25 6.25 0 0 0-3.375-5.543m-5.554-3.383a2.678 2.678 0 1 1 5.356 0 2.678 2.678 0 0 1-5.356 0m-12.5-5.355a4.462 4.462 0 0 1 5.336-4.377 4.465 4.465 0 0 1 3.253 6.085 4.463 4.463 0 0 1-8.589-1.708m9.822 16.959H6.786v-4.463a6.247 6.247 0 0 1 6.25-6.248 6.25 6.25 0 0 1 6.25 6.248v4.463zm9.821 0h-7.143v-4.463a8 8 0 0 0-.16-1.624 4.37 4.37 0 0 1 2.839-1.054 4.465 4.465 0 0 1 4.464 4.463z"
      />
      <path
        stroke="#fff"
        strokeWidth={0.75}
        d="M26.625 15.994a4.463 4.463 0 0 0-5.434-7.07 4.463 4.463 0 0 0-.316 7.07q-.3.154-.58.34a8.04 8.04 0 0 0-3.858-3.847A6.248 6.248 0 1 0 9.293 2.24a6.248 6.248 0 0 0 .333 10.246A8.04 8.04 0 0 0 5 19.752v5.355a.89.89 0 0 0 .893.893h23.214a.893.893 0 0 0 .893-.893v-3.57a6.25 6.25 0 0 0-3.375-5.543Zm-5.554-3.383a2.678 2.678 0 1 1 5.356 0 2.678 2.678 0 0 1-5.356 0Zm-12.5-5.355a4.462 4.462 0 0 1 5.336-4.377 4.465 4.465 0 0 1 3.253 6.085 4.463 4.463 0 0 1-8.589-1.708Zm9.822 16.959H6.786v-4.463a6.247 6.247 0 0 1 6.25-6.248 6.25 6.25 0 0 1 6.25 6.248v4.463zm9.821 0h-7.143v-4.463a8 8 0 0 0-.16-1.624 4.37 4.37 0 0 1 2.839-1.054 4.465 4.465 0 0 1 4.464 4.463z"
      />
    </g>
    <defs>
      <filter
        id="friendsOutline_svg__a"
        width={33.75}
        height={33.75}
        x={0.625}
        y={0.625}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_887" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_887"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgFriendsOutline;

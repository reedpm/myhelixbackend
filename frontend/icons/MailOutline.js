import * as React from "react";
const SvgMailOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={33}
    fill="none"
    {...props}
  >
    <g filter="url(#mailOutline_svg__a)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.523 0A4.523 4.523 0 0 0 4 4.523v15.954A4.523 4.523 0 0 0 8.523 25h22.236a4.523 4.523 0 0 0 4.522-4.523V4.523A4.523 4.523 0 0 0 30.76 0zM7.015 5.147v15.33c0 .833.675 1.508 1.508 1.508h22.236c.832 0 1.507-.675 1.507-1.508V5.147l-9.427 9.428a4.523 4.523 0 0 1-6.396 0zm23.12-2.132H9.146l9.428 9.428a1.507 1.507 0 0 0 2.132 0z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="mailOutline_svg__a"
        width={39.281}
        height={33}
        x={0}
        y={0}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_886" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_886"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgMailOutline;

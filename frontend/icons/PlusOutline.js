import * as React from "react";
const SvgPlusOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <g clipRule="evenodd" filter="url(#plusOutline_svg__a)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M20 29.125c-7.249 0-13.125-5.878-13.125-13.125S12.751 2.875 20 2.875 33.125 8.753 33.125 16 27.249 29.125 20 29.125M20 1C11.715 1 5 7.713 5 16c0 8.288 6.715 15 15 15s15-6.712 15-15S28.285 1 20 1m5.625 14.063h-4.687v-4.688a.938.938 0 0 0-1.875 0v4.688h-4.688a.938.938 0 0 0 0 1.874h4.688v4.688a.938.938 0 0 0 1.875 0v-4.687h4.687a.938.938 0 0 0 0-1.875"
      />
      <path
        stroke="#fff"
        strokeWidth={1.2}
        d="M20 29.125c-7.249 0-13.125-5.878-13.125-13.125S12.751 2.875 20 2.875 33.125 8.753 33.125 16 27.249 29.125 20 29.125ZM20 1C11.715 1 5 7.713 5 16c0 8.288 6.715 15 15 15s15-6.712 15-15S28.285 1 20 1Zm5.625 14.063h-4.687v-4.688a.938.938 0 0 0-1.875 0v4.688h-4.688a.938.938 0 0 0 0 1.874h4.688v4.688a.938.938 0 0 0 1.875 0v-4.687h4.687a.938.938 0 0 0 0-1.875Z"
      />
    </g>
    <defs>
      <filter
        id="plusOutline_svg__a"
        width={39.2}
        height={39.2}
        x={0.4}
        y={0.4}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_889" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_889"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPlusOutline;

import * as React from 'react';
const SvgStretchedHeaderLeftBlue = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={358}
    height={48}
    fill="none"
    {...props}
  >
    <g filter="url(#stretchedHeaderLeftBlue_svg__a)">
      <path
        fill="url(#stretchedHeaderLeftBlue_svg__b)"
        d="M273.935 20c0 11.046 17.923 20 40.032 20C336.077 40 354 31.046 354 20S336.077 0 313.967 0c-22.109 0-40.032 8.954-40.032 20"
      />
      <path
        fill="url(#stretchedHeaderLeftBlue_svg__c)"
        d="M312.823 0H4v40h308.823z"
      />
    </g>
    <defs>
      <linearGradient
        id="stretchedHeaderLeftBlue_svg__b"
        x1={802.773}
        x2={4}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <linearGradient
        id="stretchedHeaderLeftBlue_svg__c"
        x1={802.773}
        x2={4}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <filter
        id="stretchedHeaderLeftBlue_svg__a"
        width={358}
        height={48}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_16_347" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_16_347"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgStretchedHeaderLeftBlue;

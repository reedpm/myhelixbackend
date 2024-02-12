import * as React from "react";
const SvgHomeOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={37}
    fill="none"
    {...props}
  >
    <g filter="url(#homeOutline_svg__a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.333}
        d="M6 26.514h3m0 0h9m-9 0V13.692c0-.802 0-1.203.097-1.576.087-.33.23-.643.422-.926.216-.319.517-.583 1.12-1.11l7.203-6.303c1.118-.978 1.677-1.468 2.307-1.654a3 3 0 0 1 1.702 0c.63.187 1.19.676 2.31 1.656l7.2 6.3c.603.528.904.792 1.12 1.111.193.283.334.596.42.926.098.373.099.774.099 1.576v12.822m-15 0h6m-6 0v-6a3 3 0 1 1 6 0v6m9 0h-9m9 0h3"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="homeOutline_svg__a"
        width={41.333}
        height={35.847}
        x={0.333}
        y={0.333}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_675" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_675"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgHomeOutline;

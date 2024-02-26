import * as React from "react";
const SvgHeaderRectangle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={375}
    height={40}
    fill="none"
    {...props}
  >
    <path fill="url(#headerRectangle_svg__a)" d="M0 0h375v40H0z" />
    <defs>
      <linearGradient
        id="headerRectangle_svg__a"
        x1={0}
        x2={375}
        y1={20}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#344497" />
        <stop offset={1} stopColor="#943636" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgHeaderRectangle;

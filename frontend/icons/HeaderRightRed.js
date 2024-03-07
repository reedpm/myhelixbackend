import * as React from 'react';
const SvgHeaderRightRed = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    preserveAspectRatio="none"
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="url(#header__right_red_svg__a)"
      d="M35.915 20c0 11.046-8.04 20-17.957 20S0 31.046 0 20 8.04 0 17.958 0s17.957 8.954 17.957 20"
    />
    <path fill="url(#header__right_red_svg__b)" d="M18.47 0H157v40H18.47z" />
    <defs>
      <linearGradient
        id="header__right_red_svg__a"
        x1={157}
        x2={-207.88}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <linearGradient
        id="header__right_red_svg__b"
        x1={157}
        x2={-207.88}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgHeaderRightRed;

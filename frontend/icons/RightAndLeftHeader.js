import * as React from 'react';
const SvgRightAndLeftHeader = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={375}
    height={40}
    fill="none"
    {...props}
  >
    <path
      fill="url(#rightAndLeftHeader_svg__a)"
      d="M253.915 20c0 11.046-8.04 20-17.957 20S218 31.046 218 20s8.04-20 17.958-20 17.957 8.954 17.957 20"
    />
    <path
      fill="url(#rightAndLeftHeader_svg__b)"
      d="M236.471 0H375v40H236.471z"
    />
    <path
      fill="url(#rightAndLeftHeader_svg__c)"
      d="M121.085 20c0 11.046 8.04 20 17.957 20S157 31.046 157 20s-8.04-20-17.958-20-17.957 8.954-17.957 20"
    />
    <path fill="url(#rightAndLeftHeader_svg__d)" d="M138.529 0H0v40h138.529z" />
    <defs>
      <linearGradient
        id="rightAndLeftHeader_svg__a"
        x1={375}
        x2={10.12}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <linearGradient
        id="rightAndLeftHeader_svg__b"
        x1={375}
        x2={10.12}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <linearGradient
        id="rightAndLeftHeader_svg__c"
        x1={358.307}
        x2={0}
        y1={19.429}
        y2={19.429}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#943636" />
        <stop offset={1} stopColor="#334397" />
      </linearGradient>
      <linearGradient
        id="rightAndLeftHeader_svg__d"
        x1={358.307}
        x2={0}
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
export default SvgRightAndLeftHeader;

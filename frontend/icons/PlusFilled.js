import * as React from "react";
const SvgPlusFilled = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <circle cx={15} cy={15} r={15} fill="#fff" />
    <path
      stroke="#91383A"
      strokeLinecap="round"
      strokeWidth={2}
      d="M15.1 9.6v5.5m0 5.5v-5.5m0 0H9.6m5.5 0h5.5"
    />
  </svg>
);
export default SvgPlusFilled;

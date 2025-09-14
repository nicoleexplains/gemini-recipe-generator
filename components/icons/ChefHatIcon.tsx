
import React from 'react';

const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a5 5 0 0 0-5 5v2c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V7a5 5 0 0 0-5-5Z" />
    <path d="M12 11v11" />
    <path d="M16 22H8" />
    <path d="M18 11a6 6 0 0 1-12 0" />
  </svg>
);

export default ChefHatIcon;

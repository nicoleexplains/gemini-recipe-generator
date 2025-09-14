
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m12 3-1.9 3.8-4.1.6 3 2.9-.7 4.1L12 12l3.7 2.4.7-4.1 3-2.9-4.1-.6L12 3z" />
    <path d="M5 21v-3" />
    <path d="M19 21v-3" />
    <path d="M3.5 13.5h3" />
    <path d="M17.5 13.5h3" />
  </svg>
);

export default SparklesIcon;

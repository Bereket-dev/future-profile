import React from "react";

export default function RoastMark({ className = "h-7 w-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2c.6 2.4-.2 3.9-1.2 5.1C9.9 8.2 9 9.3 9 11c0 2.4 2 4 4 4s4-1.6 4-4c0-1.7-.9-2.8-1.8-3.9C14.2 5.9 13.4 4.4 14 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5c-1.8 1.2-3 3.1-3 5.2C5.5 21 7.8 22 10 22h4c2.2 0 4.5-1 4.5-3.3 0-2.1-1.2-4-3-5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}


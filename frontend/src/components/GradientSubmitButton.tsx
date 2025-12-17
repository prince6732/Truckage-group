import React from "react";

interface GradientSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  widthClass?: string;
}

export default function GradientSubmitButton({ children, widthClass = "", ...props }: GradientSubmitButtonProps) {
  return (
    <button
      className={`lg:text-base text-xl cursor-pointer font-semibold rounded-xl py-3 pl-10 pr-10 hover:pr-5 transition-all duration-300 flex justify-center items-center group bg-linear-to-l from-ribon-950 to-ribon-500 text-white bg-primary ${widthClass}`}
      {...props}
    >
      <span className="text-nowrap">{children}</span>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        className="text-xl -ml-7 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
      </svg>
    </button>
  );
}

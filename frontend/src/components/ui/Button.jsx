import React from "react";
import classNames from "classnames";

const Button = ({ variant = "default", children, className, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };

  const finalClassName = classNames(baseStyles, variants[variant], className);

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export { Button };

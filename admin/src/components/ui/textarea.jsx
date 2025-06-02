import React from 'react';

export const Textarea = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`block w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${className}`}
      {...props}
    />
  );
});

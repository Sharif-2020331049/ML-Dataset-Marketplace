import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  // Simple modal overlay and container
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-full max-h-full overflow-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const DialogDescription = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

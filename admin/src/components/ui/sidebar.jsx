import React, { createContext, useContext, useState } from 'react';

// Context & Provider to manage sidebar open/close state
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};



// UI Components for Sidebar structure

export const Sidebar = ({ children, className }) => (
  <aside className={className}>{children}</aside>
);

export const SidebarHeader = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroup = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarGroupContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SidebarMenu = ({ children, className }) => (
  <ul className={className}>{children}</ul>
);

export const SidebarMenuItem = ({ children, className }) => (
  <li className={className}>{children}</li>
);

export const SidebarMenuButton = ({
  children,
  onClick,
  isActive,
  className,
  ...props
}) => (
  <button
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={className}
    {...props}
  >
    {children}
  </button>
);

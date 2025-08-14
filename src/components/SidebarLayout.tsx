import React from "react";
import "../styles/SidebarLayout.css";

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">{sidebar}</aside>
      <main className="main">{children}</main>
    </div>
  );
};

export default SidebarLayout;
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="auth block space-y-10">{children}</main>;
};

export default Layout;

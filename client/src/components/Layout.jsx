import React from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <dic className="container mx-auto">
        <Navbar />
        {children}
      </dic>
    </React.Fragment>
  );
};

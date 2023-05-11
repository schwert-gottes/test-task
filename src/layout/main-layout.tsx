import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <main className="container">{children || <Outlet />}</main>
    </React.Fragment>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;

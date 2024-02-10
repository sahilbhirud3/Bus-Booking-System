import React from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
const Login = React.lazy(() => import('../views/pages/login/Login'))
const DefaultLayout = () => {
  return (localStorage.getItem('login'))? (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default DefaultLayout;

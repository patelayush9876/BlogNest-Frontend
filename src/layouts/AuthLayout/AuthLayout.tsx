import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => (
  <div className="min-h-[calc(100vh-11rem)] bg-gradient-to-tr from-[#EBFFF5] via-[#FFFFFF] to-[#EDFEF8] relative">
    {/* Main container with full width */}
    <div className="h-screen flex flex-col md:flex-row justify-center items-center gap-8">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;

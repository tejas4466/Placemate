import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet /> 
    </div>
  );
};

export default Layout;

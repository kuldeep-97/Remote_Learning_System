import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet/>  
      </div>
    </div>
  );
};

export default MainLayout;

// Childern ko Render krne ke liye Outlet use krte hai outlet ek trike ka componet hota hai jo react-router-dom provide krata hai 
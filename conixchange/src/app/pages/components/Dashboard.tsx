"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userName, setUserName] = useState(""); 

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      setIsAuthenticated(true);
      setUserName("John Doe");
    }
  }, []);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl font-bold text-center">
          {isAuthenticated ? `Welcome back, ${userName}` : "Please log in or sign up."}
        </h2>
    
      </div>
    </div>
  );
};

export default Dashboard;

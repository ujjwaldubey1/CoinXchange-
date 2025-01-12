"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage login state
  const [userName, setUserName] = useState(""); // Store user's name

  // Simulating an authentication check (you can use localStorage or context for actual implementation)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data if authenticated (for example purposes, we're just using the token)
      setIsAuthenticated(true);
      setUserName("John Doe"); // Replace with actual user data
    }
  }, []);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl font-bold text-center">
          {isAuthenticated ? `Welcome back, ${userName}` : "Please log in or sign up."}
        </h2>
        {/* You can add additional content for logged-in users or prompts for login/signup */}
      </div>
    </div>
  );
};

export default Dashboard;

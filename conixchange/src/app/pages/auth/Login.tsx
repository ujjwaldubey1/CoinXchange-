"use client";
import React, { useState } from "react";
import LoginForm from "@/app/pages/components/LoginForm";
import axios from "axios";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the login form submission
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      const { result, token } = response.data;

      // Store the token securely
      localStorage.setItem("token", token);

      // Redirect or perform post-login actions
      console.log("Login successful:", result);
      alert(`Welcome back, ${result.email}!`);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

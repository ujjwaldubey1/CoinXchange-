"use client";
import React from "react";
import Link from "next/link";

const Navbar = ({ isAuthenticated, userName }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">CoinXchange</div>
      <div className="space-x-6">
        {/* Conditionally render Login/Signup or User's initials */}
        {isAuthenticated ? (
          <span className="font-semibold">{userName.charAt(0).toUpperCase()}</span> // Show user's initials
        ) : (
          <>
            <Link href="/auth/login" className="hover:underline">
              Login
            </Link>
            <Link href="/auth/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

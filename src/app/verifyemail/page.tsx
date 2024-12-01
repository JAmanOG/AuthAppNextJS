"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { 
        verifyToken
        : token });
      console.log("Email verification successful:", response.data);
      setVerified(true);
      setError(false); // Reset error in case of success
      toast.success("Email verified successfully.");
    } catch (err: any) {
      console.error(
        "Error verifying email:",
        err.response?.data || err.message
      );
      setVerified(false);
      setError(true);
      toast.error("Error verifying email. Please try again.");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center text-center text-black text-xl bg-gray-100 justify-center h-screen">
      <h1 className="text-3xl font-extrabold mb-4">Verify Email</h1>
      {verified && (
        <div>
          <h1 className="text-2xl font-bold text-green-600">
            Email verified successfully!
          </h1>
          <Link href="/login">
            <p className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Login
            </p>
          </Link>
        </div>
      )}
      {!verified && !error && (
        <b>
          {token ? "Verifying email..." : "Invalid token. Please try again."}
        </b>
      )}
      {error && (
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            Error verifying email. Please try again.
          </h1>
          <Link href="/login">
            <p className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Login
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

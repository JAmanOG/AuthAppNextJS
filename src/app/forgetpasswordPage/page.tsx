"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useState } from "react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifyEmails = async () => {
    // Validate email format before making the request
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await axios.post("/api/users/forgetpassword", {
        email: email,
      });

      setSuccess(true);
      setError(false);
      toast.success("Forget password email sent successfully!");
      console.log("Email verification successful:", response.data);
    } catch (error: any) {
      console.error("Error verifying email:", error.response?.data || error.message);
      toast.error("Error verifying email. Please try again.");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Forgot Password</h1>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <button
        onClick={verifyEmails}
        disabled={isLoading}
        className={`w-full p-3 text-white font-semibold rounded-md focus:outline-none ${
          isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-600 rounded-md text-center">
          <h2 className="text-lg font-medium">Forget password email sent successfully!</h2>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-600 rounded-md text-center">
          <h2 className="text-lg font-medium">Error sending forget password email. Please try again.</h2>
        </div>
      )}
    </div>
  );
}

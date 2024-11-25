"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Handle user signup
  const onSignup = async () => {
    if (buttonDisabled) return; // Prevent clicking when disabled

    try {
      const response = await axios.post("/api/users/signup", {
        email: user.email,
        username: user.username,
        password: user.password,
        confirmPassword: user.confirmPassword,
      });
      console.log("Signup successful:", response.data);
      router.push("/login"); // Redirect to login on successful signup
    } catch (error:any) {
      console.error("Error signing up:", error.response?.data || error.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  // Validate inputs
  useEffect(() => {
    const isValid =
      user.email.includes("@") &&
      user.email.includes(".") &&
      user.email.length >= 6 &&
      user.email.length <= 50 &&
      user.password === user.confirmPassword;

    setButtonDisabled(!isValid);
  }, [user]);

  return (
    <div className="flex flex-col text-black items-center text-xl bg-gray-100 justify-center h-screen">
      <h1 className="text-3xl font-extrabold">Signup</h1>
      <br />
      <div className="flex flex-col border rounded-lg border-black p-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          className="mb-2 p-2 border border-black rounded-sm"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="mb-2 p-2 border border-black rounded-sm"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username (6-20 characters)"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="mb-2 p-2 border border-black rounded-sm"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password (6-20 characters)"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="mb-2 p-2 border border-black rounded-sm"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
        />

        <button
          onClick={onSignup}
          className={`${
            buttonDisabled ? "bg-gray-400" : "bg-black"
          } text-white p-2 rounded-md focus:outline-none`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields correctly" : "Signup"}
        </button>
        <br />
        <div className="text-center hover:underline hover:text-blue-400">
          <Link href="/login">Already a user? Login here</Link>
        </div>
      </div>
    </div>
  );
}

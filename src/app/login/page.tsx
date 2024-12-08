"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    Email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        email: user.Email,
        password: user.password,
      });
      console.log("Login successful:", response.data);
      router.push("/profile"); // Redirect to profile on successful login
    } catch (error: any) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.");
    }

  }

  useEffect(() => {
    const isValid =
      user.Email.includes("@") &&
      user.Email.includes(".") &&
      user.Email.length >= 6 &&
      user.Email.length <= 50 &&
      user.password.length >= 6 &&
      user.password.length <= 50;

    setButtonDisabled(!isValid);
  }, [user]);
    
  return (
    <div className="flex flex-col text-black items-center text-xl bg-gray-100 justify-center h-screen">
        <h1 className="text-3xl font-extrabold">Signup</h1>
        <br />
        <div className="flex flex-col border rounded-lg border-black p-4">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            className="mb-2 p-2 border border-black rounded-sm"
            value={user.Email}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
            placeholder="Email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="mb-2 p-2 border border-black rounded-sm"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <button
            onClick={onLogin}
            className="bg-black text-white p-2 rounded-md focus:outline-none focus: border-gray-400 "
          >
            {buttonDisabled?"fill the detailed":"Signup here"}

          </button>
          <br />
          <div className="text-center hover:underline hover:text-blue-400">

          <Link href='/signup'>New user Signup here</Link>
          </div>
          <br />
          <div className="text-center hover:underline hover:text-blue-400">
          <Link href='/forgetpasswordPage'>Forget Password</Link>
          </div>
        </div>
    </div>
  );
}

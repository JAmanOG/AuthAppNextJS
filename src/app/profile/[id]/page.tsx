"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function UserProfile() {
    const router = useRouter();
    const pathname = usePathname();
    const [data, setData] = useState('No data');

    const id = pathname.split("/").pop();

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("Logout successful:", response.data);
            router.push("/login");
        } catch (error: any) {
            console.error("Error logging out:", error.response?.data || error.message);
            toast.error("Logout failed. Please try again.");
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/users/usertoken`);
            console.log("User details:", response.data);
            setData(response.data);
        }
        catch (error: any) {
            console.error("Error getting user details:", error.response?.data || error.message);
            toast.error("Error getting user details. Please try again.");
        }
    }

    return (
        <div className="flex flex-col text-black items-center text-xl bg-gray-100 justify-center h-screen">
            <h1 className="text-3xl font-extrabold">Profile</h1>
            <br />
            <h1 className="text-3xl font-extrabold">{id}</h1>
            <br />
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* For debugging */}
            <br />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <br />
            <button
                onClick={getUserDetails}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
            
        </div>
    );
}

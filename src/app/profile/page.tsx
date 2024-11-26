"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("Logout successful:", response.data);
            router.push("/login"); // Redirect to login on successful logout
        } catch (error: any) {
            console.error("Error logging out:", error.response?.data || error.message);
            toast.error("Logout failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col text-black items-center text-xl bg-gray-100 justify-center h-screen">
            <h1 className="text-3xl font-extrabold">Profile</h1>
            <br />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

        </div>
    )
}
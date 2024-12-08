"use client"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React,{useState,useEffect} from "react";
import Link from "next/link";
export default function ForgetPassword() {
    
    const router = useRouter();
    const [token, setToken] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [userdata , setUserdata] = useState<{ id: string } | null>(null)

    const resetPassword = async () => {
        try {            
            //verify the token
            const resToken = await axios.post("/api/users/verifyforgetpassword", {
                verifyToken: token
            });
            console.log("Token verification successful:", resToken.data.user);
            setError(false);
            toast.success("Email verified successfully.");
            setUserdata(resToken.data.user);
            
        } catch (error: any) {
            console.error("Error resetting password:",error.response?.data || error.message);
            setError(true);
            toast.error("Error resetting password. Please try again.");
            setUserdata("");
        }
    }

    const onSubmit = async () => {
        try {
            if (!userdata) {
                toast.error("User data is missing.");
                return;
            }
            console.log("Password reset in progress...", userdata);
            const response = await axios.post("/api/users/resetPassword", {
                password: password,
                verifyToken: token,
                userId: userdata.id
            });
            console.log("Password reset successful:")
            toast.success("Password reset successfully.");
            setSuccess(true);
            setError(false);
        } catch (error: any) {
            console.log("Error resetting password:",error);
            setError(true);
            toast.error("Error resetting password. Please try again.");
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            resetPassword();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center text-center text-black text-xl bg-gray-100 justify-center h-screen">
            <h1 className="text-3xl font-extrabold mb-4">Reset Password</h1>
            {success && (
                <div>
                    <h1 className="text-2xl font-bold text-green-600">
                        Password reset successfully!
                    </h1>
                    <Link href="/login">
                        <p className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            Login
                        </p>
                    </Link>
                </div>
            )}
            {!success && !error && (
                <b>
                    {token ? "Resetting password..." : "Invalid token. Please try again."}
                </b>
            )}
            {error && (
                <div>
                    <h1 className="text-2xl font-bold text-red-600">
                        Error resetting password. Please try again.
                    </h1>
                </div>
            )}
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                className="mb-2 p-2 border border-black rounded-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={onSubmit} className="p-2 bg-blue-600 text-white rounded-sm">
                Reset Password
            </button>
        
        </div>

    );
}
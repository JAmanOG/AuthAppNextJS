import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const { email, username, password, confirmPassword } = await request.json();
        
        if (!email || !username || !password || !confirmPassword) {
            return NextResponse.json({error: "All fields are required"},{status: 400});
        }
        
        if (password !== confirmPassword) {
            return NextResponse.json({error: "Passwords do not match"},{status: 400});
        }
        
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return NextResponse.json({error: "User already exists"},{status: 400});
        }
        
        console.log("Creating user...");
        const salt = await bcryptjs.genSalt(10);
        console.log("Hashing password...");
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log("Saving user...");
        const user = new User({
            email,
            username,
            password: hashedPassword,
        });
        
        const saveduser = await user.save();

        // Send email
        await sendEmail({ email, emailType: "VERIFY", userId: saveduser._id });
        
        return NextResponse.json({message: "User created successfully",
            success: true,
            saveduser
        },{status: 201});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
    }

    
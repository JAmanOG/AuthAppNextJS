import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, verifyToken,userId } = reqBody;

    console.log(" Token:", verifyToken);

      console.log("data: ",reqBody);
    connect();

    const findUser = await User.findById(userId);

    if (!findUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 400 }
      );
    }

    if (findUser.forgetPasswordTokenExpire < Date.now()) {
      return NextResponse.json(
        { message: "Token expired." },
        { status: 400 }
      );
    }
    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    findUser.password = hashedPassword;
    findUser.forgetPasswordToken = undefined;
    findUser.forgetPasswordTokenExpire = undefined;

    await findUser.save();

    return NextResponse.json(
      { message: "Password reset successfully." },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Error resetting password. Please try again." },
      { status: 500 }
    );
  }
}

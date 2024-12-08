import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { sendEmail } from "@/helpers/mailer";


connect();

//forget password route
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log("Email:", email);
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return NextResponse.json(
        { message: "Email not found." },
        { status: 400 }
      );
    }

    const saveduser = await findUser.save();

    await sendEmail({ email, emailType: "RESET", userId: saveduser._id });

    return NextResponse.json(
        { message: "Password reset email sent successfully." },
        { status: 200 }
    );

  } catch (error: any) {
    console.error("Error verifying email:", error);
    
    return NextResponse.json(
      { message: "Error verifying email. Please try again." },
      { status: 500 }
    );
  }
}

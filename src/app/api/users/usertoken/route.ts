import { getToken } from "@/helpers/getToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function GET(request: NextRequest) {
    try {
        const token = getToken(request);

        console.log("Token:", token);

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const tokenid = token.id;
        console.log("Token ID:", tokenid);
        console.log("<---------reached here ---------->");
        const user = await User.findById(tokenid).select("-password");

        console.log("User:", user);

        return NextResponse.json({ user }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
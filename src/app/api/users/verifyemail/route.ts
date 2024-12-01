import {connect} from '@/dbconfig/dbconfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/user.model';


connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {verifyToken} = reqBody;

        console.log("Verify token:", verifyToken);

        const findUser = await User.findOne({verifyToken: verifyToken, verifyTokenExpire: {$gt: Date.now()}})

        if(!findUser){
            return NextResponse.json({message: "Invalid token or token expired."}, {status: 400});    
        }

        
        findUser.isVerified = true;
        findUser.verifyToken = undefined;
        findUser.verifyTokenExpire = undefined;

        await findUser.save();

        return NextResponse.json({message: "Email verified successfully."}, {status: 200});

    }catch(error: any){

        console.error("Error verifying email:", error);
        return NextResponse.json({message: "Error verifying email. Please try again."}, {status: 500});
    }
    
}
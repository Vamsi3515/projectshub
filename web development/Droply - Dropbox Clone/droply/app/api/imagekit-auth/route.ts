import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { error } from "console";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_SECRET_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""
});

export async function GET() {
    try {
        const userId = await auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
    
        const authParams = imagekit.getAuthenticationParameters();
    
        return NextResponse.json(authParams);
    } catch (error) {
        console.log("Error : ", error);
        return NextResponse.json({error: "Failed to generate authentication parameters for imagekit"}, {status: 500});
    }
}
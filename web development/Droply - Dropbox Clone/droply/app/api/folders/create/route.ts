import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextServer } from "next/dist/server/next";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export default async function POST(request: NextRequest){
    try {
        const {userId} = await auth();
    
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
    
        const body = await request.json();
    
        const { name, userId: bodyUserId, parentId = null } = body;

        if(bodyUserId !== userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        if(!name || typeof name !== "string" || name.trim() === ""){
            return NextResponse.json({error: "Folder Name is required"}, {status: 400});
        }

        if(parentId){
            const [parentFolder] = await db.select().from(files).where(
                and(
                    eq(files.id, parentId),
                    eq(files.userId, userId),
                    eq(files.isFolder, true)
                )
            )

            if(!parentFolder){
                return NextResponse.json({error: "Parent folder not found"}, {status: 404});
            }
        }

        const folderData = {
            id: uuidv4(),
            name: name.trim(),
            path: `/folders/${userId}/${uuidv4()}`,
            size: 0,
            type: "folder",
            fileUrl: "",
            thumbnailUrl: null,
            userId,
            parentId,
            isFolder: true,
            isStared: false,
            isTrash: false
        }

        const [newFolder] = await db.insert(files).values(folderData).returning();

    } catch (error) {
        console.log("Error : ", error);
        return NextResponse.json({error: "Failed to create a new folder"}, {status: 500});
    }
    
}
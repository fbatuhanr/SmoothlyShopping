import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    console.log(body)
    
    const updateUser = await prisma.user.update({
        where: {id},
        data: body
    })
    return NextResponse.json(updateUser)
}
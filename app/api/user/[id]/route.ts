import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { name, email, image } = body
    
    const updateUser = await prisma.user.update({
        where: {id},
        data: {name, email, image}
    })
    return NextResponse.json(updateUser)
}
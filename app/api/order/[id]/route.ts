import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { status } = body
    
    const updateUser = await prisma.order.update({
        where: {id},
        data: {
            status
        }
    })
    return NextResponse.json(updateUser)
}
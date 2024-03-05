import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { title, description, logo, banner } = body

    console.log(body)
    
    const category = await prisma.category.update({
        where: {id},
        data: { 
            title, 
            description, 
            logo, 
            banner
        }
    })
    return NextResponse.json(category)
}

export async function DELETE(request:Request, {params}: {params: {id: string}}) {
    
    const category = await prisma.category.delete({
        where: { id: params.id }
    })
    return NextResponse.json(category)
}
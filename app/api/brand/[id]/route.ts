import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { title, description } = body

    console.log(body)
    
    const brand = await prisma.brand.update({
        where: {id},
        data: { 
            title, 
            description
        }
    })
    return NextResponse.json(brand)
}

export async function DELETE(request:Request, {params}: {params: {id: string}}) {
    
    const brand = await prisma.brand.delete({
        where: { id: params.id }
    })
    return NextResponse.json(brand)
}
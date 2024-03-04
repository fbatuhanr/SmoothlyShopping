import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { name, price } = body

    console.log(body)
    
    const shippingOption = await prisma.shippingOption.update({
        where: {id},
        data: {
            name, 
            price: parseFloat(price)
        }
    })
    return NextResponse.json(shippingOption)
}

export async function DELETE(request:Request, {params}: {params: {id: string}}) {
    
    const shippingOption = await prisma.shippingOption.delete({
        where: { id: params.id }
    })
    return NextResponse.json(shippingOption)
}
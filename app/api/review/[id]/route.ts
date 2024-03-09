import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { rating, comment } = body

    console.log(body)
    
    const review = await prisma.review.update({
        where: {id},
        data: {
            rating: parseInt(rating),
            comment,
        }
    })
    return NextResponse.json(review)
}

export async function DELETE(request:Request, {params}: {params: {id: string}}) {
    
    const review = await prisma.review.delete({
        where: { id: params.id }
    })
    return NextResponse.json(review)
}
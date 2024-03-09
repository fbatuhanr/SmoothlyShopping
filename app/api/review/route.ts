import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { userId, productId, rating, comment } = body

    const review = await prisma.review.create({
        data: {
            userId,
            productId,
            rating: parseInt(rating),
            comment,
        }
    })

    return NextResponse.json(review)
}
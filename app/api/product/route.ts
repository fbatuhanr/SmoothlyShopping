import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { title, description, brandId, categoryId, price, inStock, image } = body

    const product = await prisma.product.create({
        data: {
            title,
            description,
            brandId,
            categoryId,
            price: parseFloat(price),
            inStock,
            image
        }
    })

    return NextResponse.json(product)
}
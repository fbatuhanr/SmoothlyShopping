import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { name, price } = body

    console.log(body)

    const shippingOption = await prisma.shippingOption.create({
        data: { 
            name, 
            price: parseFloat(price)
        }
    })

    return NextResponse.json(shippingOption)
}
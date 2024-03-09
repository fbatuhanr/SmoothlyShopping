import prisma from "@/libs/prismadb"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    const body = await request.json()
    const {
        userId,
        status,
        itemsCost,
        shippingOption,
        totalCost,
        items,
        deliveryAddress,
        billingAddress,
    } = body
    
    const order = await prisma.order.create({
        data: {
            userId,
            status,
            itemsCost,
            shippingOption,
            totalCost,
            items: items as Prisma.JsonArray,
            deliveryAddress: deliveryAddress as Prisma.JsonObject,
            billingAddress: billingAddress as Prisma.JsonObject,
        }
    })

    return NextResponse.json(order)
}
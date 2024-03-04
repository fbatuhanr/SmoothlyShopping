import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { CartProductProps } from "@/app/components/detail/DetailClient"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        userId,
        status,
        itemsCost,
        totalCost,
        deliveryAddressId,
        billingAddressId,
        items
    } = body

    console.log(body)
    console.log(items)

    /*
    const order = await prisma.order.create({
        data: {
            userId,
            status,
            itemsCost,
            totalCost,
            deliveryAddressId,
            billingAddressId,
            orderItems: items.map((i:any)) => ({
                productId: item.id,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price)
            })
        }
    })

    return NextResponse.json(order)
    */
}
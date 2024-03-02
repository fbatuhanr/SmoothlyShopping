import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    
    const { id } = params
    
    const body = await request.json()
    const { deliveryAddressId, billingAddressId } = body

    console.log(body)
    
    const updateUser = await prisma.user.update({
        where: {id},
        data: {deliveryAddressId, billingAddressId}
    })
    return NextResponse.json(updateUser)
}
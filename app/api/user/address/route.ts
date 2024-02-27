import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { name, address, city, state, country, zipcode, phone } = body

    console.log(body)

    const addr = await prisma.address.create({
        data: body
    })

    console.log(addr)

    return NextResponse.json(addr)
}
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { title, description } = body

    console.log(body)

    const brand = await prisma.brand.create({
        data: { 
            title, 
            description
        }
    })

    return NextResponse.json(brand)
}
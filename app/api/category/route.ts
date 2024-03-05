import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {

    const body = await request.json()
    const { title, description, logo, banner } = body

    console.log(body)

    const category = await prisma.category.create({
        data: { 
            title, 
            description, 
            logo, 
            banner
        }
    })

    return NextResponse.json(category)
}
import prisma from "@/libs/prismadb"

export default async function getOrders(){
    try{

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true
            }
        })
        return orders
    }
    catch(error: any){
        throw new Error(error)
    }
}
import prisma from "@/libs/prismadb"

interface IParams {
    userId?: string
}
export default async function getOrdersByUserId(params: IParams){
    try{
        const {userId} = params

        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if(!orders){
            return null
        }
        return orders
    }
    catch(error: any){
        throw new Error(error)
    }
}
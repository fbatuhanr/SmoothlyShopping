import prisma from "@/libs/prismadb"

interface IParams {
    userId?: string
}
export default async function getAddresses(params: IParams){
    try{
        const {userId} = params

        const addresses = await prisma.address.findMany({
            where: {
                userId: userId
            }
        })

        if(!addresses){
            return null
        }
        return addresses
    }
    catch(error: any){
        throw new Error(error)
    }
}
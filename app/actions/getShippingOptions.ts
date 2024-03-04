import prisma from "@/libs/prismadb"

export default async function getShippingOptions(){
    try{
        const shippingOptions = await prisma.shippingOption.findMany()
        return shippingOptions
    }
    catch(error: any){
        throw new Error(error)
    }
}
import prisma from "@/libs/prismadb"


export default async function getBrands(){
    try{

        const brands = await prisma.brand.findMany()

        return brands
    }
    catch(error: any){
        throw new Error(error)
    }
}
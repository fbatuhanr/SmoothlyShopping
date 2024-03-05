import prisma from "@/libs/prismadb"


export default async function getCategories(){
    try{

        const categories = await prisma.category.findMany()
        return categories
    }
    catch(error: any){
        throw new Error(error)
    }
}
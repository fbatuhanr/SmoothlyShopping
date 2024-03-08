import prisma from "@/libs/prismadb"

export interface IProductParams {
    categoryId?: string | null
    brandId?: string | null
    search?: string | null
}
export default async function getProducts(params: IProductParams){
    try{

        const {categoryId, brandId, search} = params
        let searchString = search

        if(!searchString)
            searchString = ""

        let query:any = {}
        
        if(categoryId)
            query.categoryId = categoryId

        if(brandId)
            query.brandId = brandId

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        title: {
                            contains: searchString,
                            mode: "insensitive"
                        },
                        description: {
                            contains: searchString,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                category: true,
                brand: true
            }
        })

        if(!products)
        return null

        return products
    }
    catch(error: any){
        throw new Error(error)
    }
}
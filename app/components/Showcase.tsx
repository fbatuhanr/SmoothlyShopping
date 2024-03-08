import { Prisma, Product } from '@prisma/client'
import Heading from './general/Heading'
import ProductCard from './home/ProductCard'
import { FiPackage } from 'react-icons/fi'
import { MdError } from 'react-icons/md'

type ProductWithBrandCategory = Prisma.ProductGetPayload<{
    include: { brand: true, category: true }
}>
type ProductWithPayload = Product & ProductWithBrandCategory;

interface IShowcase {
    title?: string
    products?: Array<ProductWithPayload>
    limit?: number
}

const Showcase: React.FC<IShowcase> = ({ title, products, limit  }) => {

    products = limit ? products?.slice(0, limit) : products
    return (
        <div className="w-full pt-4 pb-8">
            {
                title &&
                <div className="px-10 py-6 w-3/4 mx-auto mb-6">
                    <div className="flex justify-between items-center">
                        <Heading text={title} textSize="3xl" />
                        {
                            products &&
                            <div className="flex items-center gap-x-1 text-2xl text-slate-700">
                                <FiPackage />
                                ({products.length})
                            </div>
                        }
                    </div>
                    <div className="border-b mt-4 mx-4"></div>
                </div>
            }
            <div className="flex flex-wrap justify-center items-center px-4 md:px-14 gap-x-0 gap-y-8">
                {
                    products && products.length
                        ?
                        products.map(product =>
                            <ProductCard key={product.id} product={product} />
                        )
                        :
                        <div className="flex items-center gap-x-1 text-2xl font-medium text-slate-900 pt-12 pb-32">
                            No products found
                            <MdError />
                        </div>
                }
            </div>
        </div>
    )
}

export default Showcase
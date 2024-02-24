import Heading from "../general/Heading"
import ProductCard from "./ProductCard"
import getProducts from "@/app/actions/getProducts"

const Products = async () => {

  const products = await getProducts({category: null})

    return (
        <div className="my-6">
            <Heading text="All Products" />
            <div className="flex items-center flex-wrap gap-3 md:gap-10 px-3 md:px-10">
                {
                    products.map(product =>
                        <ProductCard key={product.id} product={product} />
                    )
                }
            </div>
        </div>
    )
}

export default Products
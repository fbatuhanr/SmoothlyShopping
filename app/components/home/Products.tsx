import Heading from "../general/Heading"
import ProductCard from "./ProductCard"
import getProducts from "@/app/actions/getProducts"

const Products = async () => {

    const products = await getProducts({ category: null })

    return (
        <div className="my-6">
            <Heading text="All Products" spacex={10} spacey={6} />
            <div className="flex flex-wrap justify-center items-center px-4 md:px-14 gap-x-0 gap-y-8">
                {
                    products.map(product =>
                        <>
                            <ProductCard key={product.id} product={product} />
                            <ProductCard key={product.id} product={product} />
                            <ProductCard key={product.id} product={product} />
                            <ProductCard key={product.id} product={product} />
                            <ProductCard key={product.id} product={product} />
                            <ProductCard key={product.id} product={product} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Products
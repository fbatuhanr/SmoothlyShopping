import Showcase from "../Showcase"
import getProducts from "@/app/actions/getProducts"

const AllProducts = async () => {

    const products = await getProducts({ category: null })

    return (
        <Showcase title="All Products" products={products} />
    )
}

export default AllProducts
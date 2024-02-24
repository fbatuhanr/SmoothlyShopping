import Image from "next/image"
import { Rating } from "@mui/material"
import textClip from "@/utils/TextClip"
import { useRouter } from "next/navigation"
import Link from "next/link"
import priceFormat from "@/utils/PriceFormat"

const ProductCard = ({ product }: { product: any }) => {

  const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="basis-1/2 md:basis-1/4 xl:basis-1/6">
      <Link href={`/product/${product.id}`}>
        <div className="mx-1 md:mx-2 p-2 md:p-4 border border-slate-150 shadow-xl rounded-md bg-white">
          <div className="relative h-[180px] lg:h-[240px]">
            <Image src={product.image} alt={product.title} fill className="object-contain" />
          </div>
          <div className="text-center mt-2 space-y-1">
            <div>{textClip(product.title)}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div className="text-orange-600 text-xl font-bold border-t mx-3 pt-3 pb-1">
              {priceFormat(product.price)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
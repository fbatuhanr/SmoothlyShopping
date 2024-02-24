import Image from "next/image"
import { Rating } from "@mui/material"
import textClip from "@/utils/TextClip"
import { useRouter } from "next/navigation"
import Link from "next/link"
import priceFormat from "@/utils/PriceFormat"

const ProductCard = ({ product }: { product: any }) => {

  const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="w-[240px] shadow-xl rounded-md">
      <Link href={`product/${product.id}`}>
        <div className="px-1 py-3">
          <div className="relative h-[150px]">
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
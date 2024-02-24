import getProductsId from '@/app/actions/getProductsId';
import DetailClient from '@/app/components/detail/DetailClient'

type DetailProps = {
    productId?: string
}
const Detail = async ({params}: {params: DetailProps}) => {

  const {productId} = params;
  const product = await getProductsId({productId})
  
  return (
    <div>
      <DetailClient product={product} />
    </div>
  )
}

export default Detail
import getProductsId from '@/app/actions/getProductsId';
import DetailClient from '@/app/components/detail/DetailClient'
import { Suspense } from 'react';

type DetailProps = {
    productId?: string
}
const Detail = async ({params}: {params: DetailProps}) => {

  const {productId} = params;
  const product = await getProductsId({productId})
  
  return (
    <DetailClient product={product} />
  )
}

export default Detail
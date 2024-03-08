import getCategories from '@/app/actions/getCategories';
import getProductsId from '@/app/actions/getProductsId';
import DetailClient from '@/app/components/detail/DetailClient'
import { Suspense } from 'react';

type DetailProps = {
    productId?: string
}
const Detail = async ({params}: {params: DetailProps}) => {

  const categories = await getCategories()

  const {productId} = params;
  const product = await getProductsId({productId})
  
  return (
    <DetailClient categories={categories} product={product} />
  )
}

export default Detail
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import getCategories from '@/app/actions/getCategories';
import getProductsId from '@/app/actions/getProductsId';
import DetailClient from '@/app/components/detail/DetailClient'

type DetailProps = {
    productId?: string
}
const Detail = async ({params}: {params: DetailProps}) => {

  const currentUser = await getCurrentUser()
  const categories = await getCategories()

  const {productId} = params;
  const product = await getProductsId({productId})
  
  return (
    <DetailClient categories={categories} product={product} currentUser={currentUser} />
  )
}

export default Detail
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getProducts from '@/app/actions/getProducts'
import AdminProductsClient from '@/app/components/admin/products/AdminProductsClient'

const Products = async () => {

  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <div>UYARI!</div>
  }

  return (
    <div>
      <AdminProductsClient products={products}/>
    </div>
  )
}

export default Products
import getProducts from '@/app/actions/getProducts'
import AdminProductsClient from '@/app/components/admin/products/AdminProductsClient'

const AdminProducts = async () => {

  const products = await getProducts({ category: null })

  return (
    <div>
      <AdminProductsClient products={products}/>
    </div>
  )
}

export default AdminProducts
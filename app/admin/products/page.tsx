import getBrands from '@/app/actions/getBrands'
import getCategories from '@/app/actions/getCategories'
import getProducts from '@/app/actions/getProducts'
import AdminProductsClient from '@/app/components/admin/products/AdminProductsClient'

const AdminProducts = async () => {

  const products = await getProducts({ category: null })

  const categories = await getCategories()
  const brands = await getBrands()

  return (
    <div>
      <AdminProductsClient products={products} categories={categories} brands={brands}/>
    </div>
  )
}

export default AdminProducts
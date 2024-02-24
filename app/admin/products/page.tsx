import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getProducts from '@/app/actions/getProducts'
import AddProductForm from '@/app/components/admin/AddProductForm'
import ManageProductsClient from '@/app/components/admin/ManageProductsClient'
import Heading from '@/app/components/general/Heading'
import React from 'react'

const Products = async () => {

  const products = await getProducts({category: null})
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== "ADMIN"){
    return <div>UYARI!</div>
  }

  return (
    <div className="w-4/5">
      <Heading text="Products" center />
      <ManageProductsClient products={products}/>
      <hr className="my-10"/>
      <AddProductForm/>
    </div>
  )
}

export default Products
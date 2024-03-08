import getCategories from '@/app/actions/getCategories';
import getProducts from '@/app/actions/getProducts';
import Showcase from '@/app/components/Showcase';
import PageContainer from '@/app/components/containers/PageContainer';
import React from 'react'

const Brand = async ({
    params,
    searchParams,
  }: {
    params: { brandName: string }
    searchParams: { [key: string]: string }
  }) => {

    const { brandName } = params
    const brandId = searchParams.id

    console.log(brandName)
    console.log(brandId)

    if (!brandName || !brandId) return;

    const categories = await getCategories()
    const products = await getProducts({ brandId })

    return (
        <PageContainer categories={categories}>
            <Showcase title={`${brandName} Products`} products={products} />
        </PageContainer>
    )
}

export default Brand
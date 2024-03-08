import getCategories from '@/app/actions/getCategories';
import getProducts from '@/app/actions/getProducts';
import Showcase from '@/app/components/Showcase';
import PageContainer from '@/app/components/containers/PageContainer';
import React from 'react'

const Category = async ({
    params,
    searchParams,
  }: {
    params: { categoryName: string }
    searchParams: { [key: string]: string }
  }) => {

    const { categoryName } = params
    const categoryId = searchParams.id

    console.log(categoryName)
    console.log(categoryId)

    if (!categoryName || !categoryId) return;

    // decodeURI(categoryUrl)

    const categories = await getCategories()
    const products = await getProducts({ categoryId })

    return (
        <PageContainer activeCategory={categoryName} categories={categories}>
            <Showcase title={`${categoryName} Products`} products={products} />
        </PageContainer>
    )
}

export default Category
import getProducts from '@/app/actions/getProducts';
import Showcase from '@/app/components/Showcase';
import PageContainer from '@/app/components/containers/PageContainer';
import Heading from '@/app/components/general/Heading';
import ProductCard from '@/app/components/home/ProductCard';
import React from 'react'

type CategoryProps = {
    categoryUrl?: string
}
const Category = async ({ params }: { params: CategoryProps }) => {

    if (!params?.categoryUrl) return;

    const { categoryUrl } = params;
    const categoryName = decodeURI(categoryUrl)

    const products = await getProducts({ category: categoryName })

    return (
        <PageContainer activeCategory={categoryName}>
            <Showcase title={`${categoryName} Products`} products={products} />
        </PageContainer>
    )
}

export default Category
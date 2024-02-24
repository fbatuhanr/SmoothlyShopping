import getProducts from '@/app/actions/getProducts';
import PageContainer from '@/app/components/containers/PageContainer';
import Heading from '@/app/components/general/Heading';
import ProductCard from '@/app/components/home/ProductCard';
import React from 'react'

type SearchProps = {
    term?: string
}
const Search = async ({ params }: { params: SearchProps }) => {

  if (!params?.term) return;

  const { term } = params;
  const termName = decodeURI(term)

  const products = await getProducts({ search: termName })

  return (
    <PageContainer>
    <div className="my-6">
        <Heading text={`Search Result of: ${termName}`} spacex={10} spacey={6} center/>
        <div className="flex flex-wrap justify-center px-4 gap-x-0 gap-y-6 min-h-96">
            {
                products && products.length
                ?
                products.map(product =>
                    <>
                        <ProductCard key={product.id} product={product} />
                        <ProductCard key={product.id} product={product} />
                        <ProductCard key={product.id} product={product} />
                        <ProductCard key={product.id} product={product} />
                        <ProductCard key={product.id} product={product} />
                        <ProductCard key={product.id} product={product} />
                    </>
                )
                :
                <div className="text-2xl text-orange-950">
                    No products found in this search term!
                </div>
            }
        </div>
    </div>
</PageContainer>
  )
}

export default Search
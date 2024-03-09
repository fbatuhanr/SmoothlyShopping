import PageContainer from '@/app/components/containers/PageContainer';
import Showcase from '@/app/components/Showcase';
import getProducts from '@/app/actions/getProducts';
import getCategories from '@/app/actions/getCategories';

type SearchProps = {
    term?: string
}
const Search = async ({ params }: { params: SearchProps }) => {

    if (!params?.term) return;

    const { term } = params;
    const termName = decodeURI(term)

    const categories = await getCategories()
    const products = await getProducts({ search: termName })

    return (
        <PageContainer categories={categories}>
            <Showcase title={`Search Results of ${termName}`} products={products} />
        </PageContainer>
    )
}

export default Search
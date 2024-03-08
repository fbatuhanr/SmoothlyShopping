import CategoryList from "./components/home/CategoryList"
import BannerCarousel from "./components/home/BannerCarousel"
import AllProducts from "./components/home/AllProducts"
import RecentlyVisited from "./components/RecentlyVisited"
import getCategories from "./actions/getCategories"

const Home = async() => {

  const categories = await getCategories()
  return (
    <div>
      <CategoryList categories={categories} />
      <BannerCarousel />
      <AllProducts />
      <RecentlyVisited />
    </div>
  )
}
export default Home
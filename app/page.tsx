import CategoryList from "./components/home/CategoryList"
import BannerCarousel from "./components/home/BannerCarousel"
import AllProducts from "./components/home/AllProducts"
import RecentlyVisited from "./components/RecentlyVisited"

const Home = () => {

  return (
    <div>
      <CategoryList />
      <BannerCarousel />
      <AllProducts />
      <RecentlyVisited />
    </div>
  )
}
export default Home
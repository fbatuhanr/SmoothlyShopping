import CategoryList from "./components/home/CategoryList"
import BannerCarousel from "./components/home/BannerCarousel"
import AllProducts from "./components/home/AllProducts"

export default function Home() {
  
  return (
    <div>
      <CategoryList />
      <BannerCarousel />
      <AllProducts />
    </div>
  );
}

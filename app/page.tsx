import Image from "next/image";
import Banner from "./components/home/Banner";
import Products from "./components/home/Products";
import { Slide } from "@mui/material";
import { FaCircle } from "react-icons/fa6";
import BannerCarousel from "./components/home/BannerCarousel";
import CategoryList from "./components/home/CategoryList";

export default function Home() {
  
  return (
    <div>
      <CategoryList />
      <BannerCarousel />
      <Products />
    </div>
  );
}

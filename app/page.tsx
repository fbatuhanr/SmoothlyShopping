import Image from "next/image";
import Category from "./components/home/Category";
import Banner from "./components/home/Banner";
import Products from "./components/home/Products";
import { Slide } from "@mui/material";
import { FaCircle } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <Category/>
      <Banner/>
      <Products/>
    </div>
  );
}

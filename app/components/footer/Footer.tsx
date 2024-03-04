import { FiPackage } from "react-icons/fi";
import { LuMousePointerClick } from "react-icons/lu";
import { IoQrCodeOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

import { FaInstagram, FaYoutube, FaFacebook, FaTiktok } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-8">
        <div className="flex flex-wrap justify-center gap-y-8 px-10 py-6 border-t border-b max-w-6xl mx-auto my-4">
          <div className="flex gap-x-2 items-center basis-full md:basis-1/4">
            <FiPackage size={54}/>
            <div>
              <div className="text-md font-normal">At Your Door Tomorrow</div>
              <div className="text-sm font-light">Get your needs the next day with Tomorrow at Your Door!</div>
            </div> 
          </div>
          <div className="flex gap-x-2 items-center basis-full md:basis-1/4 px-2">
            <LuMousePointerClick size={56}/>
            <div>
              <div className="text-md font-normal">One Click Secure Shopping</div>
              <div className="text-sm font-light">Save your payment and address information and shop safely.</div>
            </div> 
          </div>
          <div className="flex gap-x-2 items-center basis-full md:basis-1/4 px-2">
            <IoQrCodeOutline size={46}/>
            <div>
              <div className="text-md font-normal">Mobile In Your Pocket</div>
              <div className="text-sm font-light">Enjoy safe shopping wherever you want.</div>
            </div> 
          </div>
          <div className="flex gap-x-2 items-center basis-full md:basis-1/4">
            <TbTruckReturn size={64}/>
            <div>
              <div className="text-md font-normal">Return at Your Door</div>
              <div className="text-sm font-light">Returning the product you purchased has never been easier.</div>
            </div> 
          </div>
        </div> 

        <div className="bg-orange-100 flex flex-wrap gap-y-8 justify-around pt-8 pb-12">
          <div className="space-y-3">
            <h4 className="text-lg text-orange-600 font-semibold">Smoothly Shopping</h4>
            <ul className="text-md text-slate-700 space-y-2">
              <li>About Us</li>
              <li>Our Business Partners</li>
              <li>Investor Relations</li>
              <li>Customer Service</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg text-orange-600 font-semibold">Institutional</h4>
            <ul className="text-md text-slate-700 space-y-2">
              <li>About Us</li>
              <li>Our Business Partners</li>
              <li>Investor Relations</li>
              <li>Customer Service</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg text-orange-600 font-semibold">Follow Us</h4>
            <ul className="text-md text-slate-700 space-y-2">
              <li className="flex items-center gap-x-1"><FaInstagram />Instagram</li>
              <li className="flex items-center gap-x-1"><FaYoutube />Youtube</li>
              <li className="flex items-center gap-x-1"><FaFacebook />Facebook</li>
              <li className="flex items-center gap-x-1"><FaTiktok />TikTok</li>
            </ul>
          </div>
          <div className="space-y-3 text-center">
            <h4 className="text-lg text-orange-600 font-semibold">Do you have a question?</h4>
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Solution Center
            </button>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-2 text-slate-700">or</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>
            <div>
              <div className="text-xl font-medium text-slate-800">(212) 658-3916</div>
            </div>
          </div>
        </div>
        <div className="bg-orange-600">&nbsp;</div>
        <div className="bg-black flex items-center px-6 gap-x-4 min-h-10">
          <div className="text-xs text-white flex-1">All rights reserved © Copyright 2024</div>
          <div className="text-xs text-blue-100"><a href="https://github.com/fbatuhanr/" target="_blank">fbatuhanr</a></div>
          <div className="text-sm text-white"><Link href="/">SmoothlyShopping</Link></div>
        </div>
    </footer>
  )
}

export default Footer
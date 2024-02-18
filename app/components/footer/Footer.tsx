import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaXTwitter, FaLinkedinIn, FaPinterest } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-orange-100">
      <div className="flex flex-row justify-around pt-8 pb-12">
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
      <div className="flex items-center px-6 gap-x-4 bg-black min-h-10">
          <div className="text-xs text-white flex-1">All rights reserved © Copyright 2024</div>
          <div className="text-xs text-blue-100"><a href="https://github.com/fbatuhanr/" target="_blank">fbatuhanr</a></div>
          <div className="text-sm text-white">SmoothlyShopping</div>
      </div>
    </footer>
  )
}

export default Footer
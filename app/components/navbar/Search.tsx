"use client"

import Link from "next/link"
import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

const Search = () => {

  const [term, setTerm] = useState<string>("");
  return (
    <div className="hidden md:flex flex-1">

      <div className="w-full md:w-3/4 mx-auto">
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch color="#475569" />
          </div>
          <input className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            type="search" id="search"
            placeholder="Search a product..."
            onChange={(e) => setTerm(encodeURI(e.target.value))}
            required />
          <Link className={`${!term ? "pointer-events-none" : "cursor-pointer"} text-white absolute end-2.5 bottom-2.5 bg-gradient-to-br from-red-500 to-orange-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2`}
            href={term ? `/search/${term}`: ""}
            aria-disabled={!term}
            tabIndex={!term ? -1 : undefined}
          >
            Search
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Search
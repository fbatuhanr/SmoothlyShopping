"use client" 

import getProducts from '@/app/actions/getProducts'
import React from 'react'
import Heading from '../general/Heading'
import ProductCard from '../home/ProductCard'
import Showcase from '../Showcase'
import { useAppSelector } from '@/libs/redux/hooks'

const Visited = () => {

  const { visitedProducts } = useAppSelector((state) => state.statistic)

  return (
    <div className="bg-slate-50">
      <Showcase title="Recently Visited Products" products={visitedProducts} limit={4} />
    </div>
  )
}

export default Visited
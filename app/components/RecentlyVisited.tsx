"use client" 

import React from 'react'
import Showcase from './Showcase'
import { useAppSelector } from '@/libs/redux/hooks'

const RecentlyVisited = () => {

  const { visitedProducts } = useAppSelector((state) => state.statistic)

  return (
    <div className="bg-slate-50">
      <Showcase title="Recently Visited Products" products={visitedProducts} limit={4} />
    </div>
  )
}

export default RecentlyVisited
import { Skeleton } from '@mui/material'
import React from 'react'
import Heading from '../../general/Heading'

const LoadingShowcaseSkeleton = () => {
    return (
        <div className="flex flex-col items-center bg-neutral-100">
            <div className="flex items-center justify-center w-full px-3 md:px-10 gap-2 md:gap-4 py-5 md:py-8 overflow-x-auto">
                <Skeleton variant="rounded" animation="pulse" width="60%" height={40} />
            </div>

            <div className="w-full pt-4 pb-8">
                <div className="px-10 py-6 w-3/4 mx-auto mb-6">
                    <div className="flex justify-between items-center">
                        <Heading text="Loading..." />
                    </div>
                    <div className="border-b mt-4 mx-4"></div>
                </div>
                <div className="flex flex-wrap justify-center items-center px-4 md:px-14 gap-x-0 gap-y-8">
                    <div className="basis-1/2 md:basis-1/4 xl:basis-1/6">
                        <div className="mx-1 md:mx-2 p-2 md:p-4 border border-slate-150 shadow-xl rounded-md bg-white">
                            <div className="relative h-[180px] lg:h-[240px]">
                                <Skeleton variant="rounded" animation="pulse" width="100%" height="100%" />
                            </div>
                            <div className="flex flex-col items-center mt-2 space-y-1">
                                <div className="w-full"> <Skeleton variant="text" width="100%" height={20} /></div>
                                <Skeleton variant="text" width="80%" height={20} />
                                <div className="w-full text-orange-600 text-xl font-bold border-t mx-3 pt-3 pb-1">
                                    <Skeleton variant="text" width="100%" height={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingShowcaseSkeleton
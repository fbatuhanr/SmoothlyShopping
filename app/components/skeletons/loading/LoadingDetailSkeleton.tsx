import { Skeleton } from "@mui/material"

const LoadingDetailSkeleton = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full px-3 md:px-10 gap-2 md:gap-4 py-5 md:py-8 overflow-x-auto">
                <Skeleton variant="rounded" animation="pulse" width="60%" height={40} />
            </div>
            <div className="flex flex-1 flex-col gap-y-6 min-h-96 w-full max-w-screen-lg">
                <div className="flex">
                    <div className="basis-1/2">
                        <div className="relative w-[400px] h-[400px] m-auto px-5 py-10 ">
                            <Skeleton variant="rounded" animation="pulse" width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between basis-1/2 space-y-6 bg-neutral-100 py-4 ps-8 pe-2">
                        <div className="flex flex-col mb-6 gap-y-1">
                            <Skeleton variant="text" width="100%" height={20} />
                            <Skeleton variant="text" width="100%" height={20} />

                            <div className="mt-6 py-2 border-t border-b border-gray-200">
                                <Skeleton variant="text" width="100%" height={40} />
                            </div>
                        </div>

                        <div className="flex flex-col pt-1 gap-y-2">
                            <Skeleton variant="rounded" width="100%" height={50} />
                            <Skeleton variant="rounded" width="100%" height={50} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 mb-6">
                    <Skeleton variant="rectangular" animation="pulse" width="100%" height={150} />
                </div>
            </div>
        </div>
    )
}

export default LoadingDetailSkeleton
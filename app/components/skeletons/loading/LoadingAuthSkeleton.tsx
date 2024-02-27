import { Skeleton } from "@mui/material"
import Heading from "../../general/Heading"

const LoadingAuthSkeleton = () => {
    return (
        <div className="flex justify-center items-center py-6 min-h-[calc(100vh-200px)]">
            <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
                <Heading text="Loading..." center />

                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="100%" height={40} />

                <div className="my-4"></div>
                <Skeleton variant="rounded" width="100%" height={60} />
                <div className="text-center my-1">OR</div>
                <Skeleton variant="rounded" width="100%" height={60} />
            </div>
        </div>
    )
}

export default LoadingAuthSkeleton
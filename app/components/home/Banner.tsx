import Image from "next/image"

const Banner = () => {
    return (
        <div className="h-[210px] bg-orange-500 flex items-center justify-center">
            <div className="h-[200px] relative w-full">
                <Image src="/banner.jpg" alt="" fill className="object-cover object-center" />
            </div>
        </div>
    )
}

export default Banner
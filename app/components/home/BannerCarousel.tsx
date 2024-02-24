"use client"
import { Carousel } from 'flowbite-react';
import Image from 'next/image';

const BannerCarousel = () => {
    return (
        <div>
            <div className="h-96 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel className="block md:hidden" slideInterval={5000}>
                    <Image src="/banner-mobile-1.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src="/banner-mobile-2.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src="/banner-mobile-3.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                </Carousel>
                <Carousel className="hidden md:block" slideInterval={5000}>
                    <Image src="/banner-1.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src="/banner-2.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    <Image src="/banner-3.jpg" alt="..." width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                </Carousel>
            </div>
        </div>
    )
}

export default BannerCarousel
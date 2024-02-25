import { GiCheckMark, GiH2O, GiHandTruck, GiReturnArrow } from "react-icons/gi"

const Return = () => {
    return (
        <div className="flex flex-col gap-y-8 items-center">
            <div className="text-2xl font-medium mt-2">How to start the easy return process?</div>
            <div className="flex flex-col gap-y-5 text-md max-w-xl">
                <div className="flex flex-row border-b-2 pb-2 items-center gap-x-4">
                    <div className="w-1/12"><GiHandTruck size={42} /></div>
                    <div className="w-full">
                        <div className="text-lg font-medium">Make a return request</div>
                        <div className="text-md">Find the order you want to return on the My Orders page and click Easy return.</div>
                    </div>
                </div>
                <div className="flex flex-row border-b-2 pb-2 items-center gap-x-4">
                    <div className="w-1/12"><GiReturnArrow size={42} className="p-2" /></div>
                    <div className="w-full">
                        <div className="text-lg font-medium">Choose return method</div>
                        <div className="text-md">You can easily return the product you want to return with a refund at your door or choose one of the return to SmoothlyShopping point and cargo delivery options.</div>
                    </div>
                </div>
                <div className="flex flex-row pb-2 items-center gap-x-4">
                    <div className="w-1/12"><GiCheckMark size={42} className="p-2" /></div>
                    <div className="w-full">
                        <div className="text-lg font-medium">Return approve</div>
                        <div className="text-md">Package the order completely with all its equipment and deliver it with the shipment code.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Return
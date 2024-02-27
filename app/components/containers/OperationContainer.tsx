
// operations can be => cart | shipping | checkout

import { FaCaretRight, FaCheckCircle } from "react-icons/fa"
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill } from "react-icons/pi"
import { PiNumberCircleOneBold, PiNumberCircleTwoBold, PiNumberCircleThreeBold, PiNumberCircleFourBold } from "react-icons/pi"

interface OperationContainerProps {
    step: "cart" | "shipping" | "checkout"
    children: React.ReactNode
}

const OperationContainer: React.FC<OperationContainerProps> = ({ step, children }) => {
    return (
        <div>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <h2 className="text-2xl font-bold text-gray-800">smoothlyshopping</h2>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <FaCheckCircle className="text-2xl text-green-500" />
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <FaCaretRight />
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                {
                                    step === "cart"
                                        ? <PiNumberCircleTwoBold className="text-3xl" />
                                        : <FaCheckCircle className="text-2xl text-green-500" />
                                }
                                <span className="font-semibold text-gray-900">Cart</span>
                            </li>
                            <FaCaretRight />
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                {
                                    step === "cart"
                                        ?
                                        <>
                                            <PiNumberCircleThreeFill className="opacity-65 text-3xl" />
                                            <span className="font-semibold text-gray-500">Shipping</span>
                                        </>
                                        :
                                        <>
                                            {step === "shipping" ? <PiNumberCircleThreeBold className="text-3xl" /> : <FaCheckCircle className="text-2xl text-green-500" />}
                                            <span className="font-semibold text-gray-900">Shipping</span>
                                        </>
                                }
                            </li>
                            <FaCaretRight />
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                {
                                    step === "cart" || step === "shipping"
                                        ?
                                        <>
                                            <PiNumberCircleFourFill className="opacity-65 text-3xl" />
                                            <span className="font-semibold text-gray-500">Payment</span>
                                        </>
                                        :
                                        <>
                                            <PiNumberCircleFourBold className="text-3xl" />
                                            <span className="font-semibold text-gray-900">Payment</span>
                                        </>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-6xl">
                {children}
            </div>
        </div>
    )
}

export default OperationContainer
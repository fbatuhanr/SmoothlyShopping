"use client"

import { FaCaretRight, FaLongArrowAltLeft } from "react-icons/fa"
import OperationContainer from "../containers/OperationContainer"
import LinkButton from "../general/clickable/LinkButton"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import Heading from "../general/Heading"
import SelectAddress from "./SelectAddress"
import AddAddress from "./AddAddress"
import { Address, User } from "@prisma/client"

interface ManageAddressesProps {
    currentUser: User
    addresses: Array<Address>
}
const ShippingClient: React.FC<ManageAddressesProps> = ({ currentUser, addresses }) => {
    
    return (
        <OperationContainer step="shipping">
            <div className="flex shadow-md py-6 border-l border-r border-b">
                <div className="w-full flex flex-col justify-between gap-y-10 bg-white px-10 py-10">
                    <div>
                        <Heading text="Shipping Option" subText="Choose your delivery and billing address then continue to the checkout." border />
                        <SelectAddress currentUser={currentUser} addresses={addresses} />
                        <AddAddress currentUserId={currentUser.id} />
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-3/4 p-3 mr-4">
                            <LinkButton text="Back to the Cart" target="/cart" size="sm" color="tertiary" iconBegin={<FaLongArrowAltLeft />} innerHeight={0.5} />
                        </div>
                        <div className="w-1/4 p-3">
                            <LinkButton text="Checkout" target="/checkout" color="tertiary" size="base" innerHeight={3} uppercased outlined={false} iconBegin={<MdOutlineShoppingCartCheckout />} iconEnd={<FaCaretRight />} />
                        </div>
                    </div>
                </div>
            </div>
        </OperationContainer>
    )
}

export default ShippingClient
"use client"

import { Address, User } from '@prisma/client'
import SelectAddress from '../../shipping/SelectAddress'
import AddAddress from '../../shipping/AddAddress'
import Heading from '../../general/Heading'

interface UserAddressesClientProps {
    currentUser: User
    addresses: Array<Address>
}
const UserAddressesClient: React.FC<UserAddressesClientProps> = ({ currentUser, addresses }) => {

    return (
        <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
            <Heading text="My Adressess" textSize="3xl" subText="Manage your delivery and billing address." subTextSize="base" border/>
            <SelectAddress currentUser={currentUser} addresses={addresses} />
            <AddAddress currentUserId={currentUser.id} />
        </div>
    )
}

export default UserAddressesClient
"use client"

import { Address, User } from '@prisma/client'
import SelectAddress from '../../shipping/SelectAddress'
import AddAddress from '../../shipping/AddAddress'
import Heading from '../../general/Heading'

interface ManageAddressesProps {
    currentUser: User
    addresses: Array<Address>
}
const AddressesClient: React.FC<ManageAddressesProps> = ({ currentUser, addresses }) => {

    return (
        <div>
            <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
                <Heading text="My Adressess" subText="Manage your delivery and billing address." border/>
                <SelectAddress currentUser={currentUser} addresses={addresses} />
                <AddAddress currentUserId={currentUser.id} />
            </div>
        </div>
    )
}

export default AddressesClient
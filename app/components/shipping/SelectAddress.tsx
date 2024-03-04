import React, { useEffect } from 'react'
import RadioOptions from '../general/RadioOptions'
import { Address, User } from '@prisma/client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdError } from 'react-icons/md'

interface SelectAddressProps {
    currentUser: User
    addresses: Array<Address>
}

const SelectAddress: React.FC<SelectAddressProps> = ({ currentUser, addresses }) => {

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FieldValues>({
        defaultValues: {
            deliveryAddressId: currentUser.deliveryAddressId,
            billingAddressId: currentUser.billingAddressId
        }
    })

    /* 
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        axios.put(`/api/user/${currentUser?.id}`, data)
            .then((res) => {

                console.log(res)
                toast.success('Successfully updated!')
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
    */

    useEffect(() => {
        const subscription = watch((value) => {

            if (!value.deliveryAddressId || !value.billingAddressId) return;

            console.log(value)

            axios.put(`/api/user/${currentUser?.id}`, value)
                .then((res) => {

                    console.log(res)
                    toast.success('Successfully updated!')
                })
                .catch((error: any) => {
                    console.log(error)
                })
        })

        return () => subscription.unsubscribe()
    }, [watch()])

    const formattedAddresses =
        addresses.map((address: Address) => ({
            id: address.id,
            title:
                address.name + ", " +
                address.address + ", " +
                address.city + ", " +
                address.state + ", " +
                address.country + ", " +
                address.zipcode + ", " +
                address.phone +
                (address.additional ? ", (" + address.additional + ")" : "")
        })
        )

    return (
        <div className="flex w-full">
            {
            addresses.length 
                ?
                <>
                    <div className="basis-1/2 p-2">
                        <div className="text-xl">Delivery Addresses</div>
                        <div><RadioOptions id="deliveryAddressId" radioOptions={formattedAddresses} register={register} errors={errors} required /></div>
                    </div>
                    <div className="basis-1/2 p-2">
                        <div className="text-xl">Billing Addresses</div>
                        <div><RadioOptions id="billingAddressId" radioOptions={formattedAddresses} register={register} errors={errors} required /></div>
                    </div>
                </>
                :
                <div className="w-full flex justify-center items-center gap-x-1 text-xl font-medium text-slate-900 py-10">
                    You don't have a address yet, you can create address by filling below form.
                    <MdError />
                </div>
            }

        </div>
    )
}

export default SelectAddress
"use client"

import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../general/Input'
import Button from '../../general/clickable/Button'
import { Accordion } from 'flowbite-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Address, User } from '@prisma/client'
import RadioOptions from '../../general/RadioOptions'
import Swal from 'sweetalert2'

interface ManageAddressesProps {
    currentUser: User
    addresses: Array<Address>
}
const AddressesClient: React.FC<ManageAddressesProps> = ({ currentUser, addresses }) => {

    const router = useRouter()

    const [savedDeliveryAddress, setSavedDeliveryAdress] = useState<FieldValues>()
    const [savedBillingAddress, setSavedBillingAdress] = useState<FieldValues>()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: "", address: "", city: "", country: "", state: "", zipcode: "", phone: "", additional: ""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        const resultData = { ...data, userId: currentUser.id }

        axios.post("/api/user/address", resultData)
            .then(() => {
                toast.success("Address added successfully!")
                reset();
                router.refresh()
            })
            .catch(error => {
                console.log(error, "error")
            })
    }
    

    const { register: registerSelected, handleSubmit: handleSubmitSelected, formState: { errors: errorsSelected }, reset: resetSelected, watch: watchSelected } = useForm<FieldValues>({
        defaultValues: {
            deliveryAddressId: currentUser.deliveryAddressId, 
            billingAddressId: currentUser.billingAddressId
        }
    })
    const onSubmitSelected: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        axios.put(`/api/user/${currentUser?.id}`, data)
        .then((res) => {
            
            console.log(res)
            toast.success('Successfully updated!')

            Swal.fire({
                title: "Changes have been saved!",
                text: "Please log in again with the new email information.",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {

                    router.refresh();
                }
            });
        })
        .catch((error: any) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const subscription = watchSelected((value) => {

            console.log(value)
            
        })

        return () => subscription.unsubscribe()
    }, [watchSelected()])

    const formattedAddresses =
        addresses.map((address: Address) => ({
            id: address.id,
            title:
                address.name + ', ' +
                address.address + ', ' +
                address.city + ', ' +
                address.state + ', ' +
                address.country + ', ' +
                address.zipcode + ', ' +
                address.phone +
                (address.additional ? ", (" + address.additional + ')' : '')
        })
        )
    

    return (
        <div>
            <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-6">
                    <div className="font-normal">
                        <div className="text-2xl">My Addresses</div>
                        <div className="text-sm text-gray-400">Manage your delivery and billing address.</div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="basis-1/2 p-2">
                        <div className="text-xl">Delivery Addresses</div>
                        <div><RadioOptions id="deliveryAddressId" radioOptions={formattedAddresses} register={registerSelected} errors={errorsSelected} required /></div>
                    </div>
                    <div className="basis-1/2 p-2">
                        <div className="text-xl">Billing Addresses</div>
                        <div><RadioOptions id="billingAddressId" radioOptions={formattedAddresses} register={registerSelected} errors={errorsSelected} required /></div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 mt-4 mx-auto">
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title className="font-semibold">Add a New Adress</Accordion.Title>
                            <Accordion.Content>
                                <form className="px-4">
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Name</span>
                                        <Input id="name" type="text" register={register} errors={errors} required />
                                    </label>
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Adress</span>
                                        <Input id="address" type="text" register={register} errors={errors} required />
                                    </label>
                                    <div className="flex justify-between mb-2">
                                        <label className="block">
                                            <span className="text-gray-700">City</span>
                                            <Input id="city" type="text" register={register} errors={errors} required />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">State</span>
                                            <Input id="state" type="text" register={register} errors={errors} required />
                                        </label>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block">
                                            <span className="text-gray-700">Country</span>
                                            <Input id="country" type="text" register={register} errors={errors} required />
                                        </label>
                                        <label className="block">
                                            <span className="text-gray-700">Zipcode</span>
                                            <Input id="zipcode" type="text" register={register} errors={errors} required />
                                        </label>
                                    </div>
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Phone</span>
                                        <Input id="phone" type="text" register={register} errors={errors} required />
                                    </label>
                                    <label className="block mb-6">
                                        <span className="text-gray-700">Additional Information</span>
                                        <Input id="additional" type="text" register={register} errors={errors} />
                                    </label>
                                    <div className="mb-2">
                                        <Button text="Save" color="tertiary" size="xl" innerHeight={2} onClick={handleSubmit(onSubmit)} />
                                    </div>
                                </form>
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>
                <div className="flex mt-10 mb-5">
                    <Button text="Save Changes" onClick={handleSubmitSelected(onSubmitSelected)} color="secondary" size="9xl" outlined innerHeight={4} />
                </div>
            </div>
        </div>
    )
}

export default AddressesClient
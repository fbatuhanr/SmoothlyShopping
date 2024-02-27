"use client"

import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../general/Input'
import Button from '../../general/clickable/Button'
import { Accordion } from 'flowbite-react'
import Checkbox from '../../general/Checkbox'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

interface ManageAddressesProps {
    currentUser: User | null | undefined | any
}
const ManageAddresses: React.FC<ManageAddressesProps> = ({ currentUser }) => {

    const router = useRouter()

    const [savedDeliveryAddress, setSavedDeliveryAdress] = useState<FieldValues>()
    const [savedBillingAddress, setSavedBillingAdress] = useState<FieldValues>()

    const { register: registerDelivery, handleSubmit: handleSubmitDelivery, formState: { errors: errorsDelivery }, reset: resetDelivery, getValues: getValuesDelivery } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            address: "",
            city: "",
            country: "",
            state: "",
            zipcode: "",
            phone: "",
            additional: ""
        }
    })
    const onSubmitDelivery: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;
        
        setSavedDeliveryAdress(data)

        const resultData = {...data, userId: currentUser.id}

        axios.post("/api/user/address", resultData)
        .then(() => {
            toast.success("Address added successfully!")
            resetDelivery();
            router.refresh()
        })
        .catch(error => {
            console.log(error, "error")
        })
    }

    const { register: registerBilling, handleSubmit: handleSubmitBilling, formState: { errors: errorsBilling }, reset: resetBilling, watch: watchBilling, setValue: setValueBilling } = useForm<FieldValues>({
        defaultValues: {
            sameAsDelivery: false,

            name: "",
            address: "",
            city: "",
            country: "",
            state: "",
            zipcode: "",
            phone: ""
        }
    })
    const onSubmitBilling: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        delete data.sameAsDelivery
        setSavedBillingAdress(data)
    }

    useEffect(() => {
        const subscription = watchBilling((value, { name, type }) => {

            if (name !== "sameAsDelivery" || !value.sameAsDelivery) return
            console.log(value, name, type)

            setValueBilling('name', getValuesDelivery('name'))
            setValueBilling('address', getValuesDelivery('address'))
            setValueBilling('city', getValuesDelivery('city'))
            setValueBilling('country', getValuesDelivery('country'))
            setValueBilling('state', getValuesDelivery('state'))
            setValueBilling('zipcode', getValuesDelivery('zipcode'))
            setValueBilling('phone', getValuesDelivery('phone'))
        })

        return () => subscription.unsubscribe()
    }, [watchBilling()])

  return (
    <div>
         <div className="w-full flex flex-col justify-between gap-y-10 bg-white px-10 py-10">
                    <div>
                        <div className="flex justify-between border-b pb-8">
                            <div className="font-normal">
                                <h2 className="text-2xl">My Addresses</h2>
                                <p className="text-sm text-gray-400">Manage your delivery and billing address.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 mt-10 mx-auto">
                            <Accordion collapseAll>
                                <Accordion.Panel>
                                    <Accordion.Title className="font-semibold">Add a Delivery Adress</Accordion.Title>
                                    <Accordion.Content>
                                        <form className="px-4">
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Name</span>
                                                <Input id="name" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                            </label>
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Adress</span>
                                                <Input id="address" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                            </label>
                                            <div className="flex justify-between mb-6">
                                                <label className="block">
                                                    <span className="text-gray-700">City</span>
                                                    <Input id="city" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                                </label>
                                                <label className="block">
                                                    <span className="text-gray-700">State</span>
                                                    <Input id="state" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                                </label>
                                            </div>
                                            <div className="flex justify-between mb-6">
                                                <label className="block">
                                                    <span className="text-gray-700">Country</span>
                                                    <Input id="country" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                                </label>
                                                <label className="block">
                                                    <span className="text-gray-700">Zipcode</span>
                                                    <Input id="zipcode" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                                </label>
                                            </div>
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Phone</span>
                                                <Input id="phone" type="text" register={registerDelivery} errors={errorsDelivery} required />
                                            </label>
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Additional Information</span>
                                                <Input id="additional" type="text" register={registerDelivery} errors={errorsDelivery} />
                                            </label>
                                            <div className="mb-6">
                                                <Button text="Save" color="tertiary" size="xl" innerHeight={2} onClick={handleSubmitDelivery(onSubmitDelivery)} />
                                            </div>
                                        </form>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title className="font-semibold">Add a Billing Adress</Accordion.Title>
                                    <Accordion.Content>
                                        <div className="border-b mb-4 pb-4">
                                            <Checkbox id="sameAsDelivery" label="Same as Delivery Address" outline register={registerBilling} errors={errorsBilling} />
                                        </div>
                                        <form className="px-4">
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Name</span>
                                                <Input id="name" type="text" register={registerBilling} errors={errorsBilling} required />
                                            </label>
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Adress</span>
                                                <Input id="address" type="text" register={registerBilling} errors={errorsBilling} required />
                                            </label>
                                            <div className="flex justify-between mb-6">
                                                <label className="block">
                                                    <span className="text-gray-700">City</span>
                                                    <Input id="city" type="text" register={registerBilling} errors={errorsBilling} required />
                                                </label>
                                                <label className="block">
                                                    <span className="text-gray-700">State</span>
                                                    <Input id="state" type="text" register={registerBilling} errors={errorsBilling} required />
                                                </label>
                                            </div>
                                            <div className="flex justify-between mb-6">
                                                <label className="block">
                                                    <span className="text-gray-700">Country</span>
                                                    <Input id="country" type="text" register={registerBilling} errors={errorsBilling} required />
                                                </label>
                                                <label className="block">
                                                    <span className="text-gray-700">Zipcode</span>
                                                    <Input id="zipcode" type="text" register={registerBilling} errors={errorsBilling} required />
                                                </label>
                                            </div>
                                            <label className="block mb-6">
                                                <span className="text-gray-700">Phone</span>
                                                <Input id="phone" type="text" register={registerBilling} errors={errorsBilling} required />
                                            </label>
                                            <div className="mb-6">
                                                <Button text="Save" color="tertiary" size="xl" innerHeight={2} onClick={handleSubmitBilling(onSubmitBilling)} />
                                            </div>
                                        </form>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <div className="w-1/2 p-3">
                                <div className="border-2 rounded-md min-h-52">
                                    <div className="py-2 text-center text-lg border-b bg-slate-100">Selected Delivery Address</div>
                                    <div className="mt-3 p-4 text-md">
                                        {
                                            savedDeliveryAddress
                                                ?
                                                Object.values(savedDeliveryAddress).join(", ")
                                                :
                                                <p>...Not found!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 p-3">
                                <div className="border-2 rounded-md min-h-52">
                                    <div className="py-2 text-center text-lg border-b">Selected Billing Address</div>
                                    <div className="mt-3 p-4 text-md">
                                        {
                                            savedBillingAddress
                                                ?
                                                Object.values(savedBillingAddress).join(", ")
                                                :
                                                <p>...Not found!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default ManageAddresses
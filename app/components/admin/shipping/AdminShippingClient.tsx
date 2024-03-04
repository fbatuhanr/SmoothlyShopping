"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../../general/Heading"
import Input from "../../general/Input"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Button from "../../general/clickable/Button"
import { IoMdAdd, IoMdAddCircle } from "react-icons/io"
import { useState } from "react"
import { ShippingOption } from "@prisma/client"
import { MdDelete } from "react-icons/md"
import { RxUpdate } from "react-icons/rx"

export interface ShippingOptionsProps {
    shippingOptions: Array<ShippingOption>
}

const AdminShippingClient: React.FC<ShippingOptionsProps> = ({ shippingOptions }) => {

    const router = useRouter()

    console.log(shippingOptions)

    const defaultShippingOptions = shippingOptions.map((option: ShippingOption) => ({
        [`${option.id}-name`]: option.name,
        [`${option.id}-price`]: option.price
    }))
    const defaultShippingOptionsValues = Object.assign({}, ...defaultShippingOptions)

    console.log(defaultShippingOptionsValues)

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            ...defaultShippingOptionsValues,
            name: "",
            price: ""
        }
    })
    const handleAddNewOptionSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        const newData = { name: data.name, price: data.price }

        axios.post("/api/shipping", newData)
            .then(() => {
                toast.success("Shipping added successfully!")
                reset();
                
                window.location.reload()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }

    const handleUpdateOption = (id: string) => {

        const [name, price] = watch([`${id}-name`, `${id}-price`])
        const newData = {name, price}
        console.log(id)
        console.log(newData)

        axios.put(`/api/shipping/${id}`, newData)
            .then((res) => {

                console.log(res)
                toast.success('Successfully updated!')
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
    const handleDeleteOption = (id: string) => {

        console.log(id)

        axios.delete(`/api/shipping/${id}`)
            .then(() => {
                toast.success('Successfully removed!')
                router.refresh();
            })
            .catch((error: any) => {
                console.log(error)
            })

    }

    return (
        <div className="w-full px-5">
            <Heading text="Shipping Options" textSize="3xl" subText="Edit shipping options..." subTextSize="base" border />
            <div className="w-full md:w-3/4 m-auto mt-8">
                <div className="flex justify-between text-lg font-medium">
                    <div className="basis-5/12">Shipping Name</div>
                    <div className="basis-5/12">Shipping Price</div>
                    <div className="basis-1/6">&nbsp;</div>
                </div>
                {shippingOptions.map((option: ShippingOption) => (
                    <div className="flex items-center gap-2" key={option.id}>
                        <div className="basis-5/12">
                            <Input id={`${option.id}-name`} type="text" placeholder="Shipping Name..." register={register} errors={errors} />
                        </div>
                        <div className="basis-5/12">
                            <Input id={`${option.id}-price`} type="text" placeholder="Shipping Price..." register={register} errors={errors} />
                        </div>
                        <div className="basis-1/6 flex gap-x-2">
                            <Button onClick={() => handleUpdateOption(option.id)} iconBegin={<RxUpdate />} color="tertiary" className="max-w-2 h-8" />
                            <Button onClick={() => handleDeleteOption(option.id)} iconBegin={<MdDelete />} color="quaternary" className="max-w-2 h-8" />
                        </div>
                    </div>
                ))}

                <div className="flex items-center gap-2 mt-6">
                    <div className="basis-5/12">
                        <Input id="name" type="text" placeholder="Shipping Name..." register={register} errors={errors} required />
                    </div>
                    <div className="basis-5/12">
                        <Input id="price" type="text" placeholder="Shipping Price..." register={register} errors={errors} required />
                    </div>
                    <div className="basis-1/6">&nbsp;</div>
                </div>
                <div className="flex mt-1">
                    <div className="basis-5/6 pr-1">
                        <Button text="Add New Option" iconBegin={<IoMdAddCircle />} onClick={handleSubmit(handleAddNewOptionSubmit)} innerHeight={2} color="tertiary" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminShippingClient
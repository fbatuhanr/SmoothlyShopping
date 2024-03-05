"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../../general/Heading"
import Input from "../../general/Input"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Button from "../../general/clickable/Button"
import { IoMdAddCircle } from "react-icons/io"
import { Brand } from "@prisma/client"
import { MdDelete } from "react-icons/md"
import { RxUpdate } from "react-icons/rx"
import Swal from "sweetalert2"
import LoadingSpinner from "../../general/LoadingSpinner"
import { useState } from "react"

export interface AdminProductBrandsProps {
    brands: Array<Brand>
}

const AdminProductBrands: React.FC<AdminProductBrandsProps> = ({ brands }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    console.log(brands)

    const defaultBrands = brands.map((brand: Brand) => ({
        [`${brand.id}-title`]: brand.title,
        [`${brand.id}-description`]: brand.description
    }))
    const defaultBrandsValues = Object.assign({}, ...defaultBrands)

    console.log(defaultBrandsValues)

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: defaultBrandsValues
    })
    const handleAddNew: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        setIsLoading(true)

        const resultData = {
            title: data.title,
            description: data.description
        }

        axios.post("/api/brand", resultData)
            .then(() => {
                toast.success("Brand added successfully!")
                reset();
                // setIsLoading(false)

                window.location.reload()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }

    const handleUpdate = async (id: string) => {
        
        const [title, description] = watch([`${id}-title`, `${id}-description`])

        console.log(id)
        console.log(title)
        console.log(description)

        if (!id || !title || !description) return

        const response = await Swal.fire({
            title: "Do you want to update the changes?",
            showCancelButton: true,
            confirmButtonText: "Update",
        })
        if (!response.isConfirmed)
            return

        setIsLoading(true)

        const resultData = { title, description }

        axios.put(`/api/brand/${id}`, resultData)
            .then((res) => {

                console.log(res)
                toast.success('Successfully updated!')

                setIsLoading(false)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
    const handleDelete = async (id: string) => {
        console.log(id)
        if (!id) return

        const response = await Swal.fire({
            title: "Do you want to delete?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        })
        if (!response.isConfirmed)
            return


        setIsLoading(true)

        axios.delete(`/api/brand/${id}`)
        .then(() => {
            toast.success('Successfully removed!')
            setIsLoading(false)
            router.refresh();
        })
        .catch((error: any) => {
            console.log(error)
        })
    }

    return (
        <div className="w-full px-5 py-4">
            {
                !isLoading
                    ?
                    <>
                        <Heading text="Product Brands" textSize="3xl" subText="Edit brands..." subTextSize="base" border />
                        <div className="w-full mt-8">
                            <div className="grid grid-cols-3 gap-x-3 gap-y-3 items-center mb-4">
                                <div className="text-lg font-semibold">Brand Title</div>
                                <div className="text-lg font-semibold col-span-2">Brand Description</div>

                                {brands.map((brand: Brand) => (
                                <>
                                    <div>
                                        <Input id={`${brand.id}-title`} type="text" placeholder="Title..." register={register} errors={errors} />
                                    </div>
                                    <div>
                                        <Input id={`${brand.id}-description`} type="text" placeholder="Description..." register={register} errors={errors} />
                                    </div>
                                    <div className="flex gap-x-2">
                                        <Button onClick={() => handleUpdate(brand.id)} iconBegin={<RxUpdate />} color="tertiary" className="max-w-2 h-8" />
                                        <Button onClick={() => handleDelete(brand.id)} iconBegin={<MdDelete />} color="quaternary" className="max-w-2 h-8" />
                                    </div>
                                </>
                                ))}

                                <div className="border-t pt-2 mt-6">
                                    <Input id="title" type="text" placeholder="Title..." register={register} errors={errors} required />
                                </div>
                                <div className="border-t pt-2 mt-6">
                                    <Input id="description" type="text" placeholder="Description..." register={register} errors={errors} required />
                                </div>
                            </div>
                            <div className="flex mt-1">
                                <div className="w-full pr-1">
                                    <Button text="Add New Brand" iconBegin={<IoMdAddCircle />} onClick={handleSubmit(handleAddNew)} innerHeight={2} color="tertiary" />
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <LoadingSpinner />
            }
        </div>
    )
}

export default AdminProductBrands
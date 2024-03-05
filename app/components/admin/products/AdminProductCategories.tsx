"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../../general/Heading"
import Input from "../../general/Input"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Button from "../../general/clickable/Button"
import { IoMdAddCircle } from "react-icons/io"
import { Category, ShippingOption } from "@prisma/client"
import { MdDelete } from "react-icons/md"
import { RxUpdate } from "react-icons/rx"
import InputFile from "../../general/InputFile"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/libs/firebase"
import Swal from "sweetalert2"
import LoadingSpinner from "../../general/LoadingSpinner"
import { useState } from "react"

export interface ProductCategoriesProps {
    categories: Array<Category>
}

const AdminProductCategories: React.FC<ProductCategoriesProps> = ({ categories }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    console.log(categories)

    const defaultCategories = categories.map((category: Category) => ({
        [`${category.id}-title`]: category.title,
        [`${category.id}-description`]: category.description,
        [`${category.id}-logo`]: category.logo,
        [`${category.id}-banner`]: category.banner
    }))
    const defaultCategoriesValues = Object.assign({}, ...defaultCategories)

    console.log(defaultCategoriesValues)

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: defaultCategoriesValues
    })
    const handleAddNew: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        setIsLoading(true)

        const logoImgUrl = await uploadImageToStorage(data.logo[0])
        const bannerImgUrl = await uploadImageToStorage(data.banner[0])

        const resultData = {
            title: data.title,
            description: data.description,
            logo: logoImgUrl,
            banner: bannerImgUrl
        }

        axios.post("/api/category", resultData)
            .then(() => {
                toast.success("Category added successfully!")
                reset();
                // setIsLoading(false)

                window.location.reload()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }
    const uploadImageToStorage = async (file: File) => {

        const storageRef = ref(storage, `category-images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type })

        const uploadedImgUrl = await new Promise((resolve, reject) => {

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                    reject()
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL)
                    });
                }
            );
        })

        return uploadedImgUrl
    }

    const handleUpdate = async (id: string) => {
        
        const [title, description, logo, banner] = watch([`${id}-title`, `${id}-description`, `${id}-logo`, `${id}-banner`])

        console.log(id)
        console.log(title)
        console.log(description)
        console.log(logo)
        console.log(banner)

        if (!id || !title || !description || !logo || !banner) return

        const response = await Swal.fire({
            title: "Do you want to update the changes?",
            showCancelButton: true,
            confirmButtonText: "Update",
        })
        if (!response.isConfirmed)
            return

        setIsLoading(true)

        let logoImgUrl = logo
        if ('File' in window && logo[0] instanceof File) {

            try {
                const logoImgRef = ref(storage, defaultCategoriesValues[`${id}-logo`])
                await deleteObject(logoImgRef)
            }
            catch (error) { console.log(error) }

            logoImgUrl = await uploadImageToStorage(logo[0])
        }
        let bannerImgUrl = banner
        if ('File' in window && banner[0] instanceof File) {

            try {
                const bannerImgRef = ref(storage, defaultCategoriesValues[`${id}-banner`])
                await deleteObject(bannerImgRef)
            }
            catch (error) { console.log(error) }

            bannerImgUrl = await uploadImageToStorage(banner[0])
        }

        const resultData = {
            title,
            description,
            logo: logoImgUrl,
            banner: bannerImgUrl
        }

        axios.put(`/api/category/${id}`, resultData)
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

        try {
            const logoImgRef = ref(storage, defaultCategoriesValues[`${id}-logo`])
            await deleteObject(logoImgRef)

            const bannerImgRef = ref(storage, defaultCategoriesValues[`${id}-banner`])
            await deleteObject(bannerImgRef)

            axios.delete(`/api/category/${id}`)
                .then(() => {
                    toast.success('Successfully removed!')
                    setIsLoading(false)
                    router.refresh();
                })
                .catch((error: any) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleDisplayImage = (valueId: string) => {

        const [value] = watch([valueId])

        Swal.fire({
            imageUrl: value,
            imageWidth: "100%",
            imageAlt: "Category Logo - Banner"
        });
    }
    return (
        <div className="w-full px-5 py-4">
            {
                !isLoading
                    ?
                    <>
                        <Heading text="Product Categories" textSize="3xl" subText="Edit categories..." subTextSize="base" border />
                        <div className="w-full mt-8">
                            <div className="grid grid-cols-5 gap-x-3 gap-y-3 items-center mb-4">
                                <div className="text-lg font-semibold">Category Title</div>
                                <div className="text-lg font-semibold">Category Description</div>
                                <div className="text-lg font-semibold">Category Logo</div>
                                <div className="text-lg font-semibold col-span-2">Category Banner</div>

                                {categories.map((category: Category) => (
                                <>
                                    <div>
                                        <Input id={`${category.id}-title`} type="text" placeholder="Title..." register={register} errors={errors} />
                                    </div>
                                    <div>
                                        <Input id={`${category.id}-description`} type="text" placeholder="Description..." register={register} errors={errors} />
                                    </div>
                                    <div className="relative">
                                        <InputFile id={`${category.id}-logo`} register={register} errors={errors} />
                                        <Button text="See Exist Logo" size="sm" onClick={() => handleDisplayImage(`${category.id}-logo`)} className="absolute -bottom-1 right-0" />
                                    </div>
                                    <div className="relative">
                                        <InputFile id={`${category.id}-banner`} register={register} errors={errors} />
                                        <Button text="See Exist Banner" size="sm" onClick={() => handleDisplayImage(`${category.id}-banner`)} className="absolute -bottom-1 right-0" />
                                    </div>
                                    <div className="flex gap-x-2">
                                        <Button onClick={() => handleUpdate(category.id)} iconBegin={<RxUpdate />} color="tertiary" className="max-w-2 h-8" />
                                        <Button onClick={() => handleDelete(category.id)} iconBegin={<MdDelete />} color="quaternary" className="max-w-2 h-8" />
                                    </div>
                                </>
                                ))}

                                <div className="border-t pt-2 mt-6">
                                    <Input id="title" type="text" placeholder="Title..." register={register} errors={errors} required />
                                </div>
                                <div className="border-t pt-2 mt-6">
                                    <Input id="description" type="text" placeholder="Description..." register={register} errors={errors} required />
                                </div>
                                <div className="border-t pt-2 mt-6">
                                    <InputFile id="logo" register={register} errors={errors} required />
                                </div>
                                <div className="border-t pt-2 mt-6">
                                    <InputFile id="banner" register={register} errors={errors} required />
                                </div>
                            </div>
                            <div className="flex mt-1">
                                <div className="w-full pr-1">
                                    <Button text="Add New Category" iconBegin={<IoMdAddCircle />} onClick={handleSubmit(handleAddNew)} innerHeight={2} color="tertiary" />
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

export default AdminProductCategories
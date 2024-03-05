"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "@/app/components/general/clickable/Button"
import Input from "@/app/components/general/Input"

import Checkbox from "@/app/components/general/Checkbox"
import RadioOptions from "@/app/components/general/RadioOptions"
import InputFile from "@/app/components/general/InputFile"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/libs/firebase"
import { Brand, Category } from "@prisma/client"
import Select from "@/app/components/general/Select"
import { useState } from "react"
import LoadingSpinner from "../../general/LoadingSpinner"

export interface AdminAddProductProps {
    brands: Array<Brand>
    categories: Array<Category>
}

const AdminAddProduct: React.FC<AdminAddProductProps> = ({ brands, categories }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            brandId: "",
            price: "",
            categoryId: "",
            inStock: false,
            image: ""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        setIsLoading(true)

        const uploadedImgUrl = await uploadImageToStorage(data.image[0])
        const resultData = { ...data, image: uploadedImgUrl }

        axios.post("/api/product", resultData)
            .then(() => {
                toast.success("Product added successfully!")
                reset();
                setIsLoading(false)
                router.refresh()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }

    const uploadImageToStorage = async (file: File) => {

        const storageRef = ref(storage, `product-images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

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

    return (
        <div>
            {
                !isLoading
                    ?
                    <div>
                        <Input id="title" type="text" placeholder="Product title..." register={register} errors={errors} required />
                        <Input id="description" type="text" placeholder="Product description..." register={register} errors={errors} required />
                        <Select id="brandId" placeholder="Select a brand..." options={brands} register={register} errors={errors} required />
                        <Input id="price" type="number" placeholder="Product price..." register={register} errors={errors} required />
                        <RadioOptions id="categoryId" radioOptions={categories} isSideBySide register={register} errors={errors} required />
                        <Checkbox id="inStock" label="Is in stock?" outline register={register} errors={errors} />
                        <InputFile id="image" label="Product image..." register={register} errors={errors} required />
                        <Button text="Create" onClick={handleSubmit(onSubmit)} innerHeight={4} color="secondary" className="mt-8" />
                    </div>
                    :
                    <LoadingSpinner />
            }

        </div>
    )
}

export default AdminAddProduct
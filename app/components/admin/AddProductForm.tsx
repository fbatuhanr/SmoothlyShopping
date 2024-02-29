"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaHome } from "react-icons/fa"
import { FaComputer, FaDumbbell, FaKitchenSet } from "react-icons/fa6"
import { IoDiamond } from "react-icons/io5"
import Button from "../general/clickable/Button"
import Input from "../general/Input"
import Checkbox from "../general/Checkbox"
import RadioOptions from "../general/RadioOptions"
import InputFile from "../general/InputFile"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/libs/firebase"

const AddProductForm = () => {

    const router = useRouter()

    const productCategories = [
        {
            title: "Home",
            icon: <FaHome />
        },
        {
            title: "Kitchen",
            icon: <FaKitchenSet />
        },
        {
            title: "Electronic",
            icon: <FaComputer />
        },
        {
            title: "Fashion",
            icon: <IoDiamond />
        },
        {
            title: "Sports",
            icon: <FaDumbbell />
        }
    ]

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            brand: "",
            price: "",
            category: "",
            inStock: false,
            image: ""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        const uploadedImgUrl = await uploadImageToStorage(data.image[0])
        const resultData = { ...data, image: uploadedImgUrl }

        axios.post("/api/product", resultData)
            .then(() => {
                toast.success("Product added successfully!")
                reset();
                router.refresh()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }

    const uploadImageToStorage = async (file: File) => {

        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
            <Input id="title" type="text" placeholder="Product title..." register={register} errors={errors} required />
            <Input id="description" type="text" placeholder="Product description..." register={register} errors={errors} required />
            <Input id="brand" type="text" placeholder="Product brand..." register={register} errors={errors} required />
            <Input id="price" type="number" placeholder="Product price..." register={register} errors={errors} required />
            <RadioOptions id="category" radioOptions={productCategories} isSideBySide register={register} errors={errors} required />
            <Checkbox id="inStock" label="Is in stock?" outline register={register} errors={errors} />
            <InputFile id="image" label="Product image..." register={register} errors={errors} required />
            <Button text="Create" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default AddProductForm
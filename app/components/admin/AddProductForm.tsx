"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaHome } from "react-icons/fa"
import { FaComputer, FaDumbbell, FaKitchenSet } from "react-icons/fa6"
import { IoDiamond } from "react-icons/io5"
import Button from "../general/Button"
import Input from "../general/Input"
import Checkbox from "../general/Checkbox"
import RadioOptions from "../general/RadioOptions"
import InputFile from "../general/InputFile"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

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
        if(!data) return;

        data.image = data.image[0].name
        console.log(data)
        axios.post("/api/product", data)
        .then(() => {
            toast.success("Product added successfully!")
            reset();
        })
        .catch((error: AxiosError) => {
            console.log(error, "error")
        })
    }

    return (
        <div>
            <Input id="title" type="text" placeholder="Product title..." register={register} errors={errors} required/>
            <Input id="description" type="text" placeholder="Product description..." register={register} errors={errors} required/>
            <Input id="brand" type="text" placeholder="Product brand..." register={register} errors={errors} required/>
            <Input id="price" type="number" placeholder="Product price..." register={register} errors={errors} required/>
            <RadioOptions id="category" radioOptions={productCategories} register={register} errors={errors} required/>
            <Checkbox id="inStock" label="Is in stock?" outline register={register} errors={errors} />
            <InputFile id="image" label="Product image..." register={register} errors={errors} required/>
            <Button text="Create" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default AddProductForm
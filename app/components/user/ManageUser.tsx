"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../general/Button"
import Input from "../general/Input"
import { User } from "@prisma/client"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface ManageUserProps {
    currentUser: User | null | undefined | any
}

const ManageUser: React.FC<ManageUserProps> = ({ currentUser }) => {

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)

        axios.put(`/api/user/${currentUser?.id}`, data)
        .then((res) => {
            console.log(res)
            toast.success('Successfully updated!')
            router.refresh();
        })
        .catch((error: any) => {
            console.log(error)
    })

    }

    return (
        <div>
            <Input id="name" type="text" defaultValue={currentUser?.name || ""} placeholder="Name..." register={register} errors={errors} required />
            <Input id="email" type="text" defaultValue={currentUser?.email || ""} placeholder="Email..." register={register} errors={errors} required />
            <Button text="Update!" onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default ManageUser
"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../general/Button"
import Input from "../general/Input"
import { User } from "@prisma/client"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import Image from "next/image"
import InputFile from "../general/InputFile"

import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "@/libs/firebase"
import Swal from "sweetalert2"
import { useState } from "react"
import LoadingSpinner from "../general/LoadingSpinner"

interface ManageUserProps {
    currentUser: User | null | undefined | any
}

const ManageUser: React.FC<ManageUserProps> = ({ currentUser }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            image: currentUser?.image
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        setIsLoading(true)

        let uploadedImgUrl = data.image
        if ('File' in window && data.image[0] instanceof File) {

            try {
                const imageRef = ref(storage, currentUser?.image)
                await deleteObject(imageRef)
            }
            catch (error) {
                console.log(error)
            }

            uploadedImgUrl = await uploadImageToStorage(data.image[0])
        }

        const resultData = { ...data, image: uploadedImgUrl }

        axios.put(`/api/user/${currentUser?.id}`, resultData)
            .then((res) => {
                
                console.log(res)
                toast.success('Successfully updated!')
                setIsLoading(false)

                if (currentUser?.email == data.email) {
                    router.refresh();
                    return
                }

                Swal.fire({
                    title: "Changes have been saved!",
                    text: "Please log in again with the new email information.",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {

                        router.push("/login")
                        router.refresh();
                    }
                });
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    const uploadImageToStorage = async (file: File) => {

        const storageRef = ref(storage, `profile-images/${currentUser?.id}/${file.name}`);
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
                !isLoading ?
                    <div className="max-w-md mx-auto my-4 bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="border-b px-4 pb-6">
                            <div className="text-center my-4">
                                <div className="relative h-32 w-32 rounded-full border-4 border-white mx-auto my-4">
                                    {
                                        currentUser?.image
                                            ?
                                            <Image src={currentUser?.image} alt={currentUser?.name} fill />
                                            :
                                            <FaUser className="w-full h-full" />
                                    }
                                </div>
                                <div className="py-2">
                                    <h3 className="font-bold text-2xl text-gray-800 mb-1">
                                        {currentUser?.name}
                                    </h3>
                                    <div className="inline-flex gap-x-1 text-gray-700 items-center">
                                        <MdEmail />
                                        {currentUser?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="pb-2">
                                <Input id="name" type="text" defaultValue={currentUser?.name || ""} placeholder="Name..." register={register} errors={errors} required />
                                <Input id="email" type="text" defaultValue={currentUser?.email || ""} placeholder="Email..." register={register} errors={errors} required />
                                <InputFile id="image" register={register} errors={errors} />
                                <Button text="Update" onClick={handleSubmit(onSubmit)} />
                            </div>
                        </div>
                        <div className="px-4 py-4">
                            <div className="flex gap-2 items-center text-gray-800 mb-4 font-semibold">
                                <FaUser />
                                <span>Registered users</span>
                            </div>
                            <div className="flex">
                                <div className="flex justify-end mr-2">
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/men/33.jpg" alt="" />
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
                                    <img className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                                        src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />
                                    <span
                                        className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-10 w-10">
                                        +999
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingSpinner />
            }
        </div>
    )
}

export default ManageUser
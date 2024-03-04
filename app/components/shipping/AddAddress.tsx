import { Accordion } from 'flowbite-react'
import React from 'react'
import Input from '../general/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Button from '../general/clickable/Button'

const AddAddress = ({ currentUserId }: { currentUserId: String }) => {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: "", address: "", city: "", country: "", state: "", zipcode: "", phone: "", additional: ""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        const resultData = { ...data, userId: currentUserId }

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

    return (
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
    )
}

export default AddAddress
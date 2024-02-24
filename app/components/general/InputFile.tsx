"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputFileProps {
    id: string
    label?: string
    disabled?: boolean
    register: UseFormRegister<FieldValues>
    required?: boolean
    errors: FieldErrors
}

const InputFile: React.FC<InputFileProps> = ({ id, label, register, required, disabled, errors }) => {
    return (
        <div className="my-2">
            {label && <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{label}</label>}
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id={id}
                type="file"
                {...register(id, { required })}
                disabled={disabled}
            />
            <p className="mt-1 text-sm text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
    )
}

export default InputFile
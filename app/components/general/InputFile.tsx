"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputFileProps {
    id: string
    label?: string
    subText?: string
    disabled?: boolean
    register: UseFormRegister<FieldValues>
    required?: boolean
    errors: FieldErrors
}

const InputFile: React.FC<InputFileProps> = ({ id, label, subText, register, required, disabled, errors }) => {
    return (
        <div>
            {label && <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={id}>{label}</label>}
            <input className="block w-full h-12 my-1 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                id={id}
                type="file"
                {...register(id, { required })}
                disabled={disabled}
            />
            {subText && <p className="mt-1 text-sm text-gray-500">{subText}</p>}
        </div>
    )
}

export default InputFile
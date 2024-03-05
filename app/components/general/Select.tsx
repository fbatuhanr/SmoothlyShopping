"use client"

import { Brand, Category } from "@prisma/client"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface SelectProps {
    id: string
    placeholder?: string
    options: Array<Brand|Category>
    register: UseFormRegister<FieldValues>
    required?: boolean
    errors: FieldErrors
    disabled?: boolean
}

const Select: React.FC<SelectProps> = ({ id, placeholder, options, register, required, errors, disabled }) => {
    return (
        <select className="w-full rounded border border-gray-300"
            id={id}
            {...register(id, { required })}
            disabled={disabled}>
                <option value="">{placeholder ? placeholder : "Make a selection..."}</option>
            {
                options.map(option =>
                    <option key={option.id} value={option.id}>{option.title}</option>
                )
            }
        </select>
    )
}

export default Select
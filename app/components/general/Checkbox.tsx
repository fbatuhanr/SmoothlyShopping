"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface CheckboxProps {
    id: string
    label: string
    outline?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, outline, register, disabled, errors }) => {
    return (
        <div className={`flex items-center ps-4 py-3 my-2 ${outline && "border border-gray-200 rounded"}`}>
            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                id={id}
                type="checkbox"
                {...register(id)}
                disabled={disabled}
            />
            <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    )
}

export default Checkbox
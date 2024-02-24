"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface RadioOptionsProps {
    id: string
    label?: string
    radioOptions: Array<any>
    register: UseFormRegister<FieldValues>
    required?: boolean
    disabled?: boolean
    errors: FieldErrors
}

const RadioOptions: React.FC<RadioOptionsProps> = ({ id, label, radioOptions, register, required, disabled, errors }) => {
    return (
        <div className="my-2">
            {label && <h3 className="mb-1 font-semibold text-gray-900">{label}</h3>}
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                {
                    radioOptions.map((option, index) =>
                        <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                                    id={option.title}
                                    value={option.title} 
                                    type="radio" 
                                    {...register(id)} 
                                    disabled={disabled}
                                />
                                <label htmlFor={option.title} className="flex items-center gap-x-2 w-full py-3 ms-2 text-sm font-medium text-gray-900">
                                    {option.icon}
                                    {option.title} 
                                </label>
                            </div>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}

export default RadioOptions
"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface RadioOptionsProps {
    id: string
    label?: string
    radioOptions: Array<any>
    isSideBySide?: boolean
    register: UseFormRegister<FieldValues>
    required?: boolean
    disabled?: boolean
    errors: FieldErrors
}

const RadioOptions: React.FC<RadioOptionsProps> = ({ id, label, radioOptions, isSideBySide, register, required, disabled, errors }) => {
    return (
        <div className="my-2">
            {label && <h3 className="mb-1 font-semibold text-gray-900">{label}</h3>}
            <ul className={`${isSideBySide && "flex"} items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg`}>
                {
                    radioOptions.map((option, index) =>
                        <li key={index} className={`${isSideBySide ? "border-r border-b-0": "border-b"} w-full border-gray-200`}>
                            <div className="flex items-center ps-3">
                                <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                                    id={option.id ? `${id}-${option.id}` : option.title}
                                    value={option.id ? option.id : option.title}
                                    type="radio" 
                                    {...register(id)} 
                                    disabled={disabled}
                                />
                                <label htmlFor={option.id ? `${id}-${option.id}` : option.title} className="flex items-center gap-x-2 w-full py-3 ms-2 text-sm font-medium text-gray-900">
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
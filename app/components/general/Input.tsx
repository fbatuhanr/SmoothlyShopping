"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    id: string
    type: string
    defaultValue?: string
    placeholder?: string
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    required?: boolean
    disabled?: boolean
    className?: string
}

const Input:React.FC<InputProps> = ({id, type, defaultValue, placeholder, register, errors, required, disabled, className}) => {
  return (
    <input className={`w-full h-12 p-3 rounded-md outline-none my-1 border ${errors[id] ? "border-red-500" : "border-slate-300"} ${className && className}`}
        id={id} 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder} 
        {...register(id, {required})} 
        disabled={disabled} 
    />
  )
}

export default Input
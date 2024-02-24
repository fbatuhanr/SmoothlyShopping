"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    id: string
    type: string
    placeholder: string
    register: UseFormRegister<FieldValues>
    required?: boolean
    disabled?: boolean
    errors: FieldErrors
}

const Input:React.FC<InputProps> = ({id, type, placeholder, register, required, disabled, errors}) => {
  return (
    <input className={`w-full h-12 p-3 rounded-md outline-none my-2 border ${errors[id] ? "border-red-500" : "border-slate-300"}`}
        id={id} 
        type={type} 
        placeholder={placeholder} 
        {...register(id, {required})} 
        disabled={disabled} 
    />
  )
}

export default Input
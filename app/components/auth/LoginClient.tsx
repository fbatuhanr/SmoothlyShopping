"use client"

import { FaGoogle } from "react-icons/fa6"
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const LoginClient = () => {

  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)

    signIn("credentials", {
      ...data,
      redirect: false
    }).then((callback) => {
      if(callback?.ok){
        router.push("/cart")
        router.refresh()
        console.log("login success!")
      }
      else if(callback?.error){
        console.log("login error: " + callback.error)
      }
    })
  }

  return (
    <AuthContainer>
        <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
          <Heading text="Login" center/>
          <Input type="text" id="email" placeholder="Email" register={register} errors={errors} required/>
          <Input type="password" id="password" placeholder="Password" register={register} errors={errors} required/>

          <div className="my-4 text-center">
            <Link className="underline" href="/register">Click here for Register!</Link>
          </div>
          <Button text="Login" onClick={handleSubmit(onSubmit)} />
          <div className="text-center my-1">OR</div>
          <Button text="Login with Google" onClick={() => {}} icon={<FaGoogle/>}/>
        </div>
    </AuthContainer>
  )
}

export default LoginClient
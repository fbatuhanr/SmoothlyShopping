"use client"

import { FaGoogle } from "react-icons/fa6"
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/clickable/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import Link from "next/link"
import { signIn } from "next-auth/react"

import { toast } from 'react-toastify';
import { useState } from "react"
import LoadingSpinner from "../general/LoadingSpinner"
import { useRouter } from "next/navigation"

const LoginClient = () => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    console.log(data)
    if (!data) return;
    setIsLoading(true);

    const signInPromise: Promise<boolean> = new Promise((resolve, reject) => {

      signIn("credentials", {
        ...data,
        redirect: false
      }).then((callback) => {

        if (callback?.ok) {
          console.log("signIn promise login success!")
          resolve(callback.ok)
        }
        if (callback?.error) {
          console.log("signIn promise login error: " + callback.error)
          reject()
        }
      }).catch((error) => {
        console.log("request error!" + error)
      })
    });

    toast.promise(
      signInPromise,
      {
        pending: 'Login informations are checking...',
        success: 'Login successful!',
        error: 'Invalid email or password!'
      }
    )
    .then((success) => {
      if (!success) return

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 500);
    })
    .catch(() => {
      setIsLoading(false)
    })

  }

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Login" textSize="3xl" center />
        {
          !isLoading
            ?
            <>
              <Input type="text" id="email" placeholder="Email" register={register} errors={errors} required />
              <Input type="password" id="password" placeholder="Password" register={register} errors={errors} required />

              <div className="my-4 text-center">
                <Link className="underline" href="/register">Click here for Register!</Link>
              </div>
              <Button text="Login" onClick={handleSubmit(onSubmit)} color="secondary" size="lg" innerHeight={3} />
              <div className="text-center my-1">OR</div>
              <Button text="Login with Google" onClick={() => signIn("google")} color="secondary" size="lg" iconBegin={<FaGoogle />} innerHeight={3} />
            </>
            :
            <LoadingSpinner />
        }
      </div>
    </AuthContainer>
  )
}

export default LoginClient
"use client"

import { FaGoogle } from "react-icons/fa6"
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import Link from "next/link"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { Spinner } from "flowbite-react"
import { User } from "@prisma/client"

interface RegisterClientProps {
  currentUser: User | null | undefined
}

const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    console.log(data)
    if (!data) return;
    setIsLoading(true);

    const registerPromise: Promise<boolean> = new Promise((resolve, reject) => {

      axios.post("/api/register", data)
        .then(() => {
          console.log("user created");
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
        })
    });

    toast.promise(
      registerPromise,
      {
        pending: 'Informations are checking...',
        success: 'Registered Successfully',
        error: 'Invalid email or password!'
      }
    ).then((success) => {
      if (!success) return

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 500);
    }).catch(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {

    if (currentUser) {

      router.push("/")
      router.refresh()
    }
  }, [])

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Register" center />
        {
          !isLoading
            ?
            <>
              <Input type="text" id="name" placeholder="Name" register={register} errors={errors} required />
              <Input type="text" id="email" placeholder="Email" register={register} errors={errors} required />
              <Input type="password" id="password" placeholder="Password" register={register} errors={errors} required />

              <div className="my-4 text-center">
                <Link className="underline" href="/login">Click here for Login!</Link>
              </div>
              <Button text="Register" onClick={handleSubmit(onSubmit)} />
              <div className="text-center my-1">OR</div>
              <Button text="Register with Google" onClick={() => signIn("google")} icon={<FaGoogle />} />
            </>
            :
            <div className="text-center my-10">
              <Spinner size="lg" />
            </div>
        }
      </div>
    </AuthContainer>
  )
}

export default RegisterClient
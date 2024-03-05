"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GuestGuard = ({children}: {children: React.ReactNode}) => {

    const router = useRouter()
    const { data } = useSession()

    if(data?.user){
        router.push("/")
        return;
    }

    return <div>{children}</div>;
};

export default GuestGuard;
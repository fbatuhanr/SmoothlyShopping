"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UserGuard = ({children}: {children: React.ReactNode}) => {

    const router = useRouter()
    const { data } = useSession()

    if(!data?.user){
        router.push("/")
        return;
    }

    return <div>{children}</div>;
};

export default UserGuard;
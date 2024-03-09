"use client"
import React, { useState } from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import { FaCircleUser, FaUser } from "react-icons/fa6"
import { AiFillSafetyCertificate } from "react-icons/ai";
import { ClickAwayListener, Fade } from "@mui/material"
import { signOut } from "next-auth/react"


interface UserProps {
  currentUser: User | null | undefined | any
}

const Account: React.FC<UserProps> = ({ currentUser }) => {

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleMenuAction = () => {
    setIsOpened((prev) => !prev);
  }
  const handleClickAwayEvent = () => {
    setIsOpened(false);
  };

  const handleLogout = () => {
    handleMenuAction()
    signOut({
      redirect: true,
      callbackUrl: "/"
    }).then(()=>{
      window.location.reload()
    })
  }

  return (
    <div className="relative hidden md:flex">

      <ClickAwayListener onClickAway={handleClickAwayEvent}>
        <div className="relative">
          <button type="button" onClick={handleMenuAction} className="flex justify-between items-center gap-x-2 text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <div className="relative w-7 h-7">
              <div className="absolute top-0 mt-[1px]"><FaUser size={26} /></div>
            </div>
            <div>
              <p className="mt-[1px] text-base font-medium">{currentUser ? currentUser.name : "Account"}</p>
            </div>
          </button>
          <Fade in={isOpened}>
            <div className="absolute z-20 top-12 right-0 min-w-80 max-w-[24rem] rounded-lg border border-blue-gray-50 bg-white p-4 font-sans shadow-lg shadow-gray-500/10 focus:outline-none">
              {
                currentUser ?
                  <>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <FaCircleUser color="#d03803" size={48} />
                      <button type="button" onClick={handleLogout} className="rounded-lg bg-red-600 py-2 px-3 text-center text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-md hover:shadow-gray-900/20 focus:opacity-[0.5] focus:shadow-none">
                        Log out
                      </button>
                    </div>
                    <h6 className="flex items-center font-semibold gap-x-2 mb-2 text-gray-900">
                      <span className="text-lg">{currentUser?.name}</span> •{" "}
                      <a className="text-sm text-gray-700 mt-0.5" href="#">
                        {currentUser?.email}
                      </a>
                    </h6>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nam ratione eius id ea! Laboriosam earum, ab quos voluptatem nostrum obcaecati omnis laudantium.
                    </p>
                    <div className="flex justify-between items-center pt-4 mt-6 border-t border-blue-gray-50">
                      <p className="flex items-center gap-1 text-sm font-bold text-gray-700">
                        <AiFillSafetyCertificate size={18} />
                        {currentUser?.role}
                      </p>
                      <div>
                        {
                          currentUser?.role == "ADMIN" &&
                          <Link onClick={handleMenuAction} href="/admin" className="rounded-lg bg-blue-800 hover:bg-blue-500 py-2 px-2 text-center text-xs font-semibold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-md hover:shadow-gray-900/20 focus:opacity-[0.5] focus:shadow-none">
                            Admin Panel
                          </Link>
                        }
                        <Link onClick={handleMenuAction} href="/user" className="ml-1 rounded-lg bg-blue-600 hover:bg-blue-500 py-2 px-2 text-center text-xs font-semibold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-md hover:shadow-gray-900/20 focus:opacity-[0.5] focus:shadow-none">
                          User Panel
                        </Link>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="text-gray-900 text-center font-medium text-xl py-0">Login or Register</div>
                    <div className="flex flex-col gap-y-2 pt-4 pb-2 mt-2 border-t border-blue-gray-50">
                      <Link onClick={handleMenuAction} href="/login" className="rounded-lg bg-blue-600 py-2 px-3 text-center text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-md hover:shadow-gray-900/20 focus:opacity-[0.5] focus:shadow-none">
                        Login
                      </Link>
                      <Link onClick={handleMenuAction} href="/register" className="rounded-lg bg-blue-600 py-2 px-3 text-center text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-md hover:shadow-gray-900/20 focus:opacity-[0.5] focus:shadow-none">
                        Register
                      </Link>
                    </div>
                  </>
              }
            </div>
          </Fade>
        </div>
      </ClickAwayListener>

    </div>
  )
}

export default Account
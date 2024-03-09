"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface ProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
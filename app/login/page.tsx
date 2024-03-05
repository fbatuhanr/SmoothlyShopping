import LoginClient from "../components/auth/LoginClient"
import GuestGuard from "../guards/GuestGuard"

const Login = () => {

  return (
    <GuestGuard>
      <LoginClient />
    </GuestGuard>
  )
}

export default Login
import RegisterClient from '../components/auth/RegisterClient'
import GuestGuard from '../guards/GuestGuard'

const Register = () => {
  
  return (
    <GuestGuard>
        <RegisterClient/>
    </GuestGuard>
  )
}

export default Register
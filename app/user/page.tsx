import Heading from '@/app/components/general/Heading'
import ManageUser from '../components/user/ManageUser'
import { getCurrentUser } from '../actions/getCurrentUser'

const User = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div className="w-full px-5">
      <Heading text="Manage Your Account" />
      <ManageUser currentUser={currentUser}/>
    </div>
  )
}

export default User
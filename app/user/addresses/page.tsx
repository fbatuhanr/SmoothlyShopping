import { getCurrentUser } from '@/app/actions/getCurrentUser'
import ManageAddresses from '@/app/components/user/addresses/ManageAddresses'

const MyAddresses = async () => {

  const currentUser = await getCurrentUser()

  return (
    <div>
      <ManageAddresses currentUser={currentUser}/>
    </div>
  )
}

export default MyAddresses
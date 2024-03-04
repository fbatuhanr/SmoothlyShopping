import getAddresses from '@/app/actions/getAddresses'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import UserAddressesClient from '@/app/components/user/addresses/UserAddressesClient'

const UserAddresses = async () => {

  const currentUser = await getCurrentUser()
  const addresses = await getAddresses({ userId: currentUser?.id })

  return (
    <div>
     <UserAddressesClient currentUser={currentUser} addresses={addresses}/>
    </div>
  )
}

export default UserAddresses
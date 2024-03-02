import getAddresses from '@/app/actions/getAddresses'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import AddressesClient from '@/app/components/user/addresses/AddressesClient'

const MyAddresses = async () => {

  const currentUser = await getCurrentUser()
  const addresses = await getAddresses({ userId: currentUser?.id })

  return (
    <div>
     <AddressesClient currentUser={currentUser} addresses={addresses}/>
    </div>
  )
}

export default MyAddresses
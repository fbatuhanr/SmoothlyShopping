import getAddresses from '@/app/actions/getAddresses'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import AddressesClient from '@/app/components/user/addresses/AddressesClient'

const MyAddresses = async () => {

  const currentUser = await getCurrentUser()
  const resu = await getAddresses({ userId: currentUser?.id })

  return (
    <div>
     {
      JSON.stringify(resu)

     }
     <AddressesClient currentUser={currentUser}/>
    </div>
  )
}

export default MyAddresses
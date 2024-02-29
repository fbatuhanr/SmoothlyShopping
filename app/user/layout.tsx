import React from 'react'
import UserSidebar from '../components/user/UserSidebar'
import ManageContainer from '../components/containers/ManageContainer'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  
  alert("hi")
  return (
    <div className="flex">
      <UserSidebar />
      <ManageContainer>
        {children}
      </ManageContainer>
    </div>
  )
}

export default UserLayout
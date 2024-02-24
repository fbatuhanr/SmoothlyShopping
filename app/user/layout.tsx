import React from 'react'
import UserSidebar from '../components/user/UserSidebar'

const UserLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex gap-3">
        <UserSidebar/>
        <div className="w-4/5 pb-10">{children}</div>
    </div>
  )
}

export default UserLayout
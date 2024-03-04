import React from 'react'
import AdminSidebar from '../components/admin/sidebar/AdminSidebar'
import ManageContainer from '../components/containers/ManageContainer'
import { getCurrentUser } from '../actions/getCurrentUser'

const AdminLayout = async({ children }: { children: React.ReactNode }) => {
  
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== "ADMIN") {
    
    return null
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <ManageContainer>
        {children}
      </ManageContainer>
    </div>
  )
}

export default AdminLayout
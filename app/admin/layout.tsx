import React from 'react'
import AdminSidebar from '../components/admin/sidebar/AdminSidebar'
import ManageContainer from '../components/containers/ManageContainer'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
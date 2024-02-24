import React from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex gap-3">
        <AdminSidebar/>
        <div className="w-full pb-10">{children}</div>
    </div>
  )
}

export default AdminLayout
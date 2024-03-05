import AdminSidebar from '../components/admin/sidebar/AdminSidebar'
import ManageContainer from '../components/containers/ManageContainer'
import AdminGuard from '../guards/AdminGuard'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />
        <ManageContainer>
          {children}
        </ManageContainer>
      </div>
    </AdminGuard>
  )
}

export default AdminLayout
import UserSidebar from '../components/user/UserSidebar'
import ManageContainer from '../components/containers/ManageContainer'
import UserGuard from '../guards/UserGuard'

const UserLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <UserGuard>
      <div className="flex">
        <UserSidebar />
        <ManageContainer>
          {children}
        </ManageContainer>
      </div>
    </UserGuard>
  )
}

export default UserLayout

const ManageContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-4/5 px-2 py-6 border-b-4 -ml-0.5 border-b-orange-600">
        {children}
    </div>
  )
}

export default ManageContainer
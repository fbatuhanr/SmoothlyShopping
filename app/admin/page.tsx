import Heading from "../components/general/Heading"

const Admin = () => {
  return (
    <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
      <Heading text="Dashboard" textSize="3xl" subText="Welcome to the admin dashboard.." subTextSize="base" border />
      <div className="text-lg">
        <div>Create & manage products</div>
        <div>Manage shipping settings</div>
        <div>Manage orders</div>
      </div>
    </div>
  )
}

export default Admin
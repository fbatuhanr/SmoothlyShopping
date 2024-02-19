

const PageContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center bg-neutral-100">
        {children}
    </div>
  )
}

export default PageContainer
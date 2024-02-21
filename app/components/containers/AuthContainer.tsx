const AuthContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex justify-center items-center py-6 bg-neutral-50 min-h-fit h-full w-full">
        {children}
      </div>
    )
  }
  
  export default AuthContainer
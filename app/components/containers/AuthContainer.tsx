const AuthContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex justify-center items-center py-6 min-h-fit">
        {children}
      </div>
    )
  }
  
  export default AuthContainer
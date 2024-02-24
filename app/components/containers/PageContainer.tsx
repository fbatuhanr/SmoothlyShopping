import CategoryList from "../home/CategoryList"

const PageContainer = ({ activeCategory, children }: { activeCategory?:string, children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center bg-neutral-100">
    <CategoryList activeCategory={activeCategory}/>
    {children}
  </div>
  )
}

export default PageContainer
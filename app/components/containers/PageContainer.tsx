import CategoryList from "../home/CategoryList"

interface PageContainerProps {
  activeCategory?: string
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ activeCategory, children }) => {
  return (
    <div className="flex flex-col items-center bg-neutral-100">
      <CategoryList activeCategory={activeCategory} />
      {children}
    </div>
  )
}

export default PageContainer
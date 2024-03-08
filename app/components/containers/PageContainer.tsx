import { Category } from "@prisma/client"
import CategoryList from "../home/CategoryList"
import Image from "next/image"


interface PageContainerProps {
  activeCategory?: string
  categories: Array<Category>
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ activeCategory, categories, children }) => {

  const activeCategoryBannerUrl = categories.find(cat => cat.title == activeCategory)?.banner

  return (
    <div className="flex flex-col items-center bg-neutral-100">
      <div className="relative w-full h-48">
        <div className="flex items-center absolute top-0 left-0 right-0 bottom-0 z-10">
          <CategoryList activeCategory={activeCategory} categories={categories} />
        </div>
        {
          activeCategoryBannerUrl &&
          <div className="absolute top-0 left-0 right-0 bottom-0 w-4/5 mx-auto h-48 brightness-50">
            <Image src={activeCategoryBannerUrl} fill className="rounded-b-lg object-cover object-center" />
          </div>
        }
      </div>

      {children}
    </div>
  )
}

export default PageContainer
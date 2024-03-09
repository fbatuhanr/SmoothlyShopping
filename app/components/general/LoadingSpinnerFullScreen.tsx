import { Spinner } from 'flowbite-react'

const LoadingSpinnerFullScreen = () => {
  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 z-20">
        
        <div className="scale-150">
            <Spinner color="info" size="xl" />
        </div>

    </div>
  )
}

export default LoadingSpinnerFullScreen
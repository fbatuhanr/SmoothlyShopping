
const Description = ({description}: {description: string}) => {
    return (
        <div className="flex flex-col gap-y-8 items-center">
            <div className="text-2xl font-medium mt-2">Details</div>
            <div className="flex flex-col gap-y-5 text-md max-w-xl">
                {description}
            </div>
        </div>
    )
}

export default Description
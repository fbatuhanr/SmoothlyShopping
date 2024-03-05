import { redirect } from 'next/navigation'
import { getCurrentUser } from "../actions/getCurrentUser";

const AdminGuard = async({children}: {children: React.ReactNode}) => {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        
        redirect("/")
        return
    }

    return <div>{children}</div>;
};

export default AdminGuard;
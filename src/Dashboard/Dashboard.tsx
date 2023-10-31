import axios from "axios";
import { useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";

const Dashboard: React.FC = ()  => {
    console.log("Dashboard component rendered");
    const userContext = useContext(UserContext);

  
    const user = userContext ? userContext.user : null;

    const fetchUserInfo = async () => {
        console.log("About to make the API call to get user info");
        const token = localStorage.getItem('token')
        console.log("from dashboard token" + token);
        if (!token) return;

        try {
            const response = await axios.get('https://localhost:7286/api/Account/getuserinfo', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const {id, email} = response.data;
                const user = userContext ? userContext.user : null;
                userContext?.setUser({
                    ...userContext.user,
                    email: email,
                    fullName: userContext.user?.fullName || '',
                });
                console.log("Updated User Context:", userContext?.user);

            }
        } catch (error: any) {
            console.error("Error fetching user info:", error);
            console.log(userContext?.user?.email)
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, []); 
    

    console.log("Rendering with user:", user);


    return (
        <>
        {/* should not be visible if user does not have a profile at all -- access denied or no route   */}
        <div className="container d-flex justify-content-center py-4">
            <h1>Welcome {user?.email}</h1>

        </div>
        </>
    )
}
export default Dashboard;
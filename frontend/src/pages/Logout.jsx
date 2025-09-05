import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
           await localStorage.removeItem("token");
        
           navigate("/");
            alert("Logging Out"); // Ensured the alert is from the window object
        };
        performLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

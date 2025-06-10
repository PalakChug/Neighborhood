
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export function Landing() {
    const navigate = useNavigate();
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "solid #f7fafc"
        }}>
            <GoogleLogin 
            onSuccess={(credentialResponse) => {
                console.log (credentialResponse);
                navigate("/home")
            }} 
            onError={() => console.log ("Login failed")}/>
        </div>
    );
}
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/Authform";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
            navigate("/ViewUser");
            // Optionally navigate to dashboard
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthForm onSubmit={handleLogin} buttonText="Login" isLogin />
    );
}

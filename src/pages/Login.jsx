import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/Authform";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User Info:", auth.currentUser);
            console.log("Token:", auth.currentUser.accessToken);
            // save the user token in localStorage
            localStorage.setItem("userToken", auth.currentUser.accessToken);
            // save the user email in localStorage
            localStorage.setItem("userEmail", auth.currentUser.email);
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthForm onSubmit={handleLogin} buttonText="Login" isLogin />
    );
}

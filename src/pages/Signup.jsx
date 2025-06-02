import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import AuthForm from "../components/Authform";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const handleSignup = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthForm onSubmit={handleSignup} buttonText="Sign Up" isLogin={false} />
    );
}

import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ onSubmit, buttonText, isLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    const handleToggleAuth = () => {
        navigate(isLogin ? "/signup" : "/login");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#223037",
                 overflow: "hidden"
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: 350, borderRadius: 5, backgroundColor: "#fff" }}>
                <Typography variant="h5" mb={3} textAlign="center">
                    {buttonText}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        {buttonText}
                    </Button>
                </form>

                {/* Toggle Link Below the Form */}
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2">
                        {isLogin
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <Link component="button" variant="body2" onClick={handleToggleAuth}>
                            {isLogin ? "Sign Up" : "Login"}
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

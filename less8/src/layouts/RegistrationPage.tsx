import React, {useState} from 'react';
import Container from "@mui/material/Container";
import {CssBaseline, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {login} from "../store/slices/userSlice";
import {AppDispatch} from "../store/store";
import {useAppDispatch} from "../hooks/hooks";
import {register} from "../api/userActions";
import {useNavigate} from "react-router-dom";

export default function RegistrationPage() {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function registerHandler(e: React.FormEvent) {
        e.preventDefault();
        const user = {username, password};

        try {
            const response = await register(username, password);
            if (response.status !== 400) {
                dispatch(login(user));
                navigate('/');
            }
        } catch (error) {
            console.error( error);
            console.error('Error during registration:', error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form onSubmit={registerHandler} noValidate> {}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} // Прив'язка значення
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign up
                    </Button>
                </form>
            </div>
        </Container>
    );
}

import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import { CssBaseline, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../store/slices/userSlice";
import { RootState } from "../store/store";
import {useAppDispatch} from "../hooks/hooks";
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isToken = useSelector((state: RootState) => state.user.token);
    const navigate = useNavigate();

    function loginHandler(e: React.FormEvent) {
        e.preventDefault();

        const user = { username, password };

        dispatch(login(user));
    }

    useEffect(() => {
        if (isToken) {
            navigate('/');
        }
    }, [isToken, navigate]);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={loginHandler} noValidate> {}
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
                        value={username} // Прив'язка значення
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
                        Sign In
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        If you don't have an account,{' '}
                        <Button color="primary" onClick={() => navigate('/register')}>
                            click here
                        </Button>
                    </Typography>
                </form>
            </div>
        </Container>
    );
}

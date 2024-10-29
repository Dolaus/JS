import {Link, Route, Routes} from "react-router-dom";
import About from "./pages/about/About";
import Heroes from "./pages/heroes/Heroes";
import cl from "./App.module.css";
import {Button, Grid, Switch} from "@mui/material";
import {HeroesContext} from "./context/HeroesContext";
import {useState} from "react";
import CurrentHero from "./pages/currentHero/currentHero";
import Home from "./pages/home/Home";

function App() {
    const [heroesId, setHeroesId] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <HeroesContext.Provider value={{
            heroesId,
            setHeroesId,
            isDarkMode,
            setIsDarkMode
        }}>
            <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <Grid container spacing={2} sx={{
                    backgroundImage: isDarkMode ? 'linear-gradient(180deg, #121212, #1e1e1e)' : 'linear-gradient(180deg, #f5f5f5, #ffffff)',
                    minHeight: '100vh',
                    padding: '20px',
                    color: isDarkMode ? 'white' : 'black'
                }}>
                    <Grid item xs={2}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button  component={Link} to="/" sx={{ backgroundColor: isDarkMode ? '#3f51b5' : '#1976d2', color: 'white' }}>Home</Button>
                            <Button  component={Link} to="/heroes" sx={{ backgroundColor: isDarkMode ? '#3f51b5' : '#1976d2', color: 'white' }}>Ricks</Button>
                            <Button  component={Link} to="/about" sx={{ backgroundColor: isDarkMode ? '#3f51b5' : '#1976d2', color: 'white' }}>About</Button>
                        </nav>
                        <div style={{ marginTop: '20px' }}>
                            <Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/heroes" element={<Heroes/>}/>
                            <Route path="/about" element={<About/>}/>
                        </Routes>
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentHero/>
                    </Grid>
                </Grid>
            </div>
        </HeroesContext.Provider>
    );
}

export default App;

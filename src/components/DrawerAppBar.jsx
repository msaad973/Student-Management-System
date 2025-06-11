import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

function DrawerAppBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: '#223037' }}>
                <Toolbar>
                    {/* Menu icon for mobile */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Spacer to push logout button to the right */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Logout button aligned right */}
                    <Button
                        sx={{
                            color: '#fff',
                            ':hover': {
                                backgroundColor: '#334155',
                                color: '#fff',
                            },
                        }}
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;

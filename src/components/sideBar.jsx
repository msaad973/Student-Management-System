import * as React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Divider,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate, useLocation} from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer({ children }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/view-details' },
        { text: 'Assignment', icon: <AssignmentIcon />, path: '/assignment' },
        { text: 'Quiz', icon: <QuizIcon />, path: '/quiz' },
    ];

    const handleMenuItemClick = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const drawerContent = (
        <div style={{ height: '100%', backgroundColor: '#223037', color: 'white', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                >
                    Student Portal
                </Typography>
            </Toolbar>
            <Divider sx={{ borderColor: '#374151' }} />
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={{
                                color: 'white',
                                backgroundColor: location.pathname === item.path ? '#344155' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#334155',
                                },
                            }}
                            onClick={() => handleMenuItemClick(item.path)}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={<Typography>{item.text}</Typography>} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Divider sx={{ borderColor: '#374151', mb: 2 }} />
                <Button
                    fullWidth
                    sx={{
                        color: '#fff',
                        backgroundColor: '#dc2626',
                        ':hover': {
                            backgroundColor: '#b91c1c',
                            color: '#fff',
                        },
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        textTransform: 'none',
                    }}
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#223037',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#223037',
                            color: 'white',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#223037',
                            color: 'white',
                        },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;

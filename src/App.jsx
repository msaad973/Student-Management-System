import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import ViewDetails from './pages/ViewDetails';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ResponsiveDrawer from './components/sideBar';
import { Box, Toolbar } from '@mui/material';

const drawerWidth = 240;

function AppContent() {
  const location = useLocation();
  const showSidebar = !['/signup', '/login'].includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {showSidebar && <ResponsiveDrawer />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: showSidebar ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route path="/view-details" element={<ViewDetails />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
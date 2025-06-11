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

function AppContent() {
  const location = useLocation();
  const showSidebar = !['/signup', '/login'].includes(location.pathname);

  return (
    <>
      {showSidebar ? (
        <ResponsiveDrawer>
          <Routes>
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/overview" element={<ViewUser />} />
            <Route path="/view-details" element={<ViewDetails />} />
            <Route path="/assignment" element={<div>Assignment Page - Coming Soon</div>} />
            <Route path="/quiz" element={<div>Quiz Page - Coming Soon</div>} />
            <Route path="/" element={<ViewUser />} />
            <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>404 Page Not Found</div>} />
          </Routes>
        </ResponsiveDrawer>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>404 Page Not Found</div>} />
        </Routes>
      )}
    </>
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

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
import AssignmentPage from './pages/Assignment';
import QuizPage from './pages/QuizPage';
import StudentAssignments from './pages/StudentAssignment';

function AppContent() {
  const location = useLocation();
  
  // Define pages that should NOT show the sidebar
  const noSidebarPages = ['/signup', '/login','/','/edituser'];
  
  // Check if current path should show sidebar
  const showSidebar = !noSidebarPages.includes(location.pathname);

  return (
    <>
      {showSidebar ? (
        <ResponsiveDrawer>
          <Routes>
            <Route path="/view-details" element={<ViewDetails />} />
            <Route path="/assignment" element={<AssignmentPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/student-assignments" element={<StudentAssignments />} />
            <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>404 Page Not Found</div>} />
          </Routes>
        </ResponsiveDrawer>
      ) : (
        <Routes> 
          <Route path="/" element={<ViewUser />} />
          <Route path="/view-details" element={<View-details />} />
          <Route path="/edituser" element={<EditUser />} />
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
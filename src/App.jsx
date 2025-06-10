import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewDetails from './pages/ViewDetails';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route path="/view-details" element={<ViewDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
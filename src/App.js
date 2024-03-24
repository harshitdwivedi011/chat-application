import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import { useContext } from 'react';
import { AuthContext } from './Components/Context/AuthContext';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <Router>
      <div className='parent'>
        <Routes>
          <Route index element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import axios from 'axios';
import ForgotPassword from './pages/ForgotPassword';
import AuthInvalidRoute from './components/AuthInvalidRoute';

// axios.defaults.baseURL = "https://us-central1-seng-401-on-the-house.cloudfunctions.net/api";

function App() {
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<AuthInvalidRoute/>} >
            <Route path="/login" element={<LoginPage/>} />
          </Route>
          <Route path="/signup" element={<AuthInvalidRoute/>} >
            <Route path="/signup" element={<SignUpPage/>} />
          </Route>
          <Route path="/forgotpassword" element={<AuthInvalidRoute/>} >
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

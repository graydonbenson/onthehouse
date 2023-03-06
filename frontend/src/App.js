import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import axios from 'axios';
import ForgotPassword from './pages/ForgotPassword';

// axios.defaults.baseURL = "https://us-central1-seng-401-on-the-house.cloudfunctions.net/api";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

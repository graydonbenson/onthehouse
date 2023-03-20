import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import axios from 'axios';
import ForgotPassword from './pages/ForgotPassword';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import MyRecipes from './pages/MyRecipes';
import EditPost from './pages/EditPost';

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
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/edit/:id" element={<EditPost/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/my-recipes" element={<MyRecipes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

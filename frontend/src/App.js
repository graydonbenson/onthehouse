import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPassword from './pages/ForgotPassword';
import AuthInvalidRoute from './components/AuthInvalidRoute';
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthInvalidRoute />} >
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/signup" element={<AuthInvalidRoute />} >
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route path="/forgotpassword" element={<AuthInvalidRoute />} >
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/post/:id" element={<ProtectedRoute />}>
            <Route path="/post/:id" element={<PostPage />} />
          </Route>
          <Route path="/edit/:id" element={<ProtectedRoute />}>
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          <Route path="/create" element={<ProtectedRoute />}>
            <Route path="/create" element={<CreatePost />} />
          </Route>
          <Route path="/my-recipes" element={<ProtectedRoute />}>
            <Route path="/my-recipes" element={<MyRecipes />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

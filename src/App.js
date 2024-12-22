import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthProvider from "./AuthContext";
function App() {
  return (
    <AuthProvider>
           <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

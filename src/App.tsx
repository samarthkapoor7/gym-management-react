import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import MemberDashboard from './components/MemberDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: { fontFamily: 'Montserrat, sans-serif' },
    h2: { fontFamily: 'Montserrat, sans-serif' },
    h3: { fontFamily: 'Montserrat, sans-serif' },
    h4: { fontFamily: 'Montserrat, sans-serif' },
    h5: { fontFamily: 'Montserrat, sans-serif' },
    h6: { fontFamily: 'Montserrat, sans-serif' },
    button: { fontFamily: 'Montserrat, sans-serif' },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    background: { default: '#000000', paper: '#333333' },
    text: { primary: '#ffffff', secondary: '#cccccc' },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background-image"></div>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <div className="line-accent"></div>
            <h1>ELITE GYM</h1>
            <div className="line-accent"></div>
          </div>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/member" element={<PrivateRoute><MemberDashboard /></PrivateRoute>} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;


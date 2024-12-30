import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./components/Login";
import React from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: '#fffff',
    },
    background: {
      default: '#000000',
      paper: '#333333'
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"


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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App

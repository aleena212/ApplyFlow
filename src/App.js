import { useState } from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";

import AppRoutes from "./routes/AppRoutes";

import getTheme from "./theme/theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default App;

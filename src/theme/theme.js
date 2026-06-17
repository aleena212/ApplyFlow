import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",

      primary: {
        main: "#8E24AA",
      },

      secondary: {
        main: "#EC407A",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 15,

            padding: "12px",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            marginTop: "10px",
          },
        },
      },
    },
  });
};

export default getTheme;

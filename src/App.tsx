import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import "./App.css";
import Router from "./Router";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#8757d1",
              ":hover": {
                backgroundColor: "#9b80c4",
              },
            }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" && {
              borderColor: "#8757d1",
              color: "#8757d1",
            }),
        }),
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Router />
    </ThemeProvider>
  );
}

export default App;

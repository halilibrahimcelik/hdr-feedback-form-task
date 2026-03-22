import { createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material";
const themeOptions: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  typography: {
    fontFamily: "Comic Sans MS, cursive, sans-serif",
  },
  palette: {
    primary: {
      main: "#6366f1df",
    },
    secondary: {
      main: "#ec4899",
    },
    mode: "light",
  },
};

const theme = createTheme(themeOptions);

export default theme;

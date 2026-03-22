import { ThemeProvider } from "@mui/material/styles";

import theme from "@/config/theme";

interface Props {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;

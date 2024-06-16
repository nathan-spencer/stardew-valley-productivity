import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import CropTable from "./components/CropTable";
// use dark theme base on user preference
const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const darkTheme = createTheme({
  palette: {
    mode: userPrefersDark ? "dark" : "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CropTable />
    </ThemeProvider>
  );
}

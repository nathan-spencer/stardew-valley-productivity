import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import CropTable from "./components/CropTable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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

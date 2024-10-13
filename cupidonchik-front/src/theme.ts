import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#e91e63", // ruby color
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Set the default border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e91e63", // Set the border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e91e63", // Set the border color when focused
          },
        },
        input: {
          color: "#ffffff", // Ensure the input text is white
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#aaaaaa", // Label color
          "&.Mui-focused": {
            color: "#e91e63", // Label color when focused
          },
        },
      },
    },
  },
});

export default theme;

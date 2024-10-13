// src/components/GradientButton.tsx
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  color: "#fff",
  padding: theme.spacing(1, 4),
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(45deg, #FE6B8B 40%, #FF8E53 100%)",
  },
}));

export default function CustomGradientButton(props: ButtonProps) {
  return <GradientButton {...props} />;
}

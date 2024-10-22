import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const BottomNav: React.FC = () => {
  const [value, setValue] = React.useState(window.location.pathname);
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <BottomNavigationAction
        label="Profile"
        value="/"
        icon={<AccountCircleIcon />}
      />
      <BottomNavigationAction
        label="Matches"
        value="/matches"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Settings"
        value="/settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
};

const StyledBottomNav = styled(BottomNav)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
}));

export default StyledBottomNav;

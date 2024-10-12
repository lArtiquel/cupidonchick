import React from "react";
import { useAppSelector } from "../../store";
import { Avatar, Typography, Box } from "@mui/material";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.userInfo);

  if (!user) {
    return <Typography>Loading user info...</Typography>;
  }

  return (
    <Box textAlign="center" mt={4}>
      <Avatar
        src={user.photo_url}
        alt={`${user.first_name} ${user.last_name}`}
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      {user.username && (
        <Typography variant="subtitle1">@{user.username}</Typography>
      )}
    </Box>
  );
};

export default Profile;

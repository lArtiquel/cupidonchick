import React from "react";
import { useAppSelector } from "../../store";
import { Avatar, Typography, Box } from "@mui/material";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.userProfile);

  if (!user) {
    return <Typography>Loading user info...</Typography>;
  }

  return (
    <Box textAlign="center" mt={4}>
      <Avatar
        src={user.photoUrl}
        alt={`${user.firstName} ${user.lastName}`}
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="h5">
        {user.firstName} {user.lastName}
      </Typography>
      {user.username && (
        <Typography variant="subtitle1">@{user.username}</Typography>
      )}
      {user.bio && <Typography variant="subtitle1">Bio: {user.bio}</Typography>}
    </Box>
  );
};

export default Profile;

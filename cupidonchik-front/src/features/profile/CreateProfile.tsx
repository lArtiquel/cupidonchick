import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { setUserProfile } from "../user/userSlice";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const CreateProfile: React.FC = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile = {
      telegramUserId: userInfo?.id,
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      username: userInfo?.username,
      photo_url: userInfo?.photo_url,
      bio,
      // Add other fields
    };

    // Save profile to backend
    fetch("/.netlify/functions/saveProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUserProfile(data.profile));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Create Your Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Bio"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {/* Add other fields as necessary */}
          <Button variant="contained" color="primary" fullWidth type="submit">
            Save Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProfile;

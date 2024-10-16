import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { setUserExists, setUserProfile } from "../user/userSlice";
import { TextField, Container, Typography, Box } from "@mui/material";
import GradientButton from "../../components/GradientButton";

const CreateProfile: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
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
    fetch(`${backendUrl}/.netlify/functions/saveProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUserProfile(data.profile));
        dispatch(setUserExists(true));
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
          <GradientButton variant="contained" fullWidth type="submit">
            Save Profile
          </GradientButton>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProfile;

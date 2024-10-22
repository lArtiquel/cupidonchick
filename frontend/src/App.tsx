// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  setUserProfile,
  setUserExists,
} from "./features/user/userSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./features/profile/Profile";
import Matches from "./features/matches/Matches";
import Settings from "./features/settings/Settings";
import BottomNav from "./components/BottomNav";
import useTelegram from "./hooks/useTelegram";
import CreateProfile from "./features/profile/CreateProfile";
import { useAppSelector } from "./store";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

const App: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const dispatch = useDispatch();
  const { tg } = useTelegram();
  const userExists = useAppSelector((state) => state.user.userExists);
  const navigate = useNavigate();

  // Ref to prevent duplicate fetches
  const hasFetchedRef = useRef(false);

  // Loading and Error States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Prevent duplicate fetches
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;

      const user = tg?.initDataUnsafe?.user;
      if (user) {
        dispatch(setUserInfo(user));
        try {
          const response = await fetch(
            `${backendUrl}/.netlify/functions/checkUser?telegramUserId=${user.id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.exists) {
            // User exists, update Redux store with profile info
            dispatch(setUserProfile(data.user));
            dispatch(setUserExists(true));
            setIsLoading(false);
          } else {
            // User does not exist
            dispatch(setUserExists(false));
            setIsLoading(false);
            navigate("/create-profile");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data. Please try again.");
          setIsLoading(false);
        }
      } else {
        // If no user data is available
        setIsLoading(false);
        setError("No user data found.");
      }
    };

    fetchUserData();
  }, [tg, dispatch, navigate, backendUrl]);

  // Display Loading Spinner
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  // Display Error Message with Retry Option
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
        p={2}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Routes>
        {userExists ? (
          <>
            <Route path="/" element={<Profile />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <Route path="/create-profile" element={<CreateProfile />} />
        )}
      </Routes>
      {userExists && <BottomNav />}
    </>
  );
};

export default App;

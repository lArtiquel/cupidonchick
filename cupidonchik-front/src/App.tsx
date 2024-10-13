import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setUserProfile } from "./features/user/userSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./features/profile/Profile";
import Matches from "./features/matches/Matches";
import Settings from "./features/settings/Settings";
import BottomNav from "./components/BottomNav";
import useTelegram from "./hooks/useTelegram";
import { setUserExists } from "./features/user/userSlice";
import CreateProfile from "./features/profile/CreateProfile";
import { useAppSelector } from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { tg } = useTelegram();
  const userExists = useAppSelector((state) => state.user.userExists);
  const navigate = useNavigate();

  useEffect(() => {
    const user = tg.initDataUnsafe.user;
    if (user) {
      dispatch(setUserInfo(user));
      // Fetch user data from backend
      fetch(`/.netlify/functions/checkUser?telegramUserId=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            // User exists, update Redux store with profile info
            dispatch(setUserProfile(data.user));
          } else {
            // User does not exist
            dispatch(setUserExists(false));
            navigate("/create-profile");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [tg, dispatch, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default App;

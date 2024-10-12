import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Profile from "./features/profile/Profile";
import Matches from "./features/matches/Matches";
import Settings from "./features/settings/Settings";
import BottomNav from "./components/BottomNav";
import useTelegram from "./hooks/useTelegram";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { tg } = useTelegram();

  useEffect(() => {
    const user = tg.initDataUnsafe?.user;
    if (user) {
      dispatch(setUserInfo(user));
    }
  }, [tg, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default App;

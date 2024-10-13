import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebAppUser } from "@twa-dev/types";

interface UserState {
  userInfo: WebAppUser | null;
  userProfile: UserProfile | null;
  userExists: boolean;
}

interface UserProfile {
  telegramUserId: number;
  // Add other profile fields
}

const initialState: UserState = {
  userInfo: null,
  userProfile: null,
  userExists: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<WebAppUser>) {
      state.userInfo = action.payload;
    },
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    setUserExists(state, action: PayloadAction<boolean>) {
      state.userExists = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
      state.userProfile = null;
      state.userExists = true;
    },
  },
});

export const { setUserInfo, setUserProfile, setUserExists, clearUserInfo } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebAppUser } from "@twa-dev/types";

interface UserState {
  userInfo: WebAppUser | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<WebAppUser>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;

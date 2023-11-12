import { createSlice } from "@reduxjs/toolkit";

// User gained via login or register
const initialState = {
  userName: "Curently logged out",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;

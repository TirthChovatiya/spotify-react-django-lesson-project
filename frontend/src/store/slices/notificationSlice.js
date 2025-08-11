import { createSlice } from "@reduxjs/toolkit";

// Toast component is at frontend\src\components\Toast.tsx

const initialState = {
  toast: {
    open: false,
    type: undefined,
    message: '',
  }
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    closeToast: (state) => {
      state.toast.open = false;
    }
  }
});

export const { setToast, closeToast } = notificationSlice.actions;

export default notificationSlice;

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  messages: [{ id: 1, message: "Hey" }],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const message = {
        id: nanoid(),
        text: action.payload,
      };

      state.messages.push(message);
    },

    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});

export const { sendMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;

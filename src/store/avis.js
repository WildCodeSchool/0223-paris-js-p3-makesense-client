import { createSlice } from "@reduxjs/toolkit";

const avis = createSlice({
  name: "avis",
  initialState: [],
  reducers: {
    createAvis: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeAvis: (state, action) => {
      return state.filter((avis) => avis.id != action.payload);
    },
    sendAvisData: (state, action) => {
      return action.payload;
    },
    editAvisData: (state, action) => {
      const { id, newText } = action.payload;
      const avisToEdit = state.avis.find((avis) => avis.id === id);
      if (avisToEdit) {
        avisToEdit.text = newText;
      }
    },
  },
});

export const { createAvis, removeAvis, sendAvisData, editAvisData } =
  avis.actions;

export default avis.reducer;

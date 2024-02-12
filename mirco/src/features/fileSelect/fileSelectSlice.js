import { createSlice } from '@reduxjs/toolkit';

const fileSelectSlice = createSlice({
  name: 'fileSelectSlice',
  initialState: {
    selectedFile: null,
    fileContent: '',
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    loadFileContent: (state, action) => {
      state.fileContent = action.payload;
    },
  },
});

export const { selectFile, loadFileContent } = fileSelectSlice.actions;
export default fileSelectSlice.reducer;
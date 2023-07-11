import {createSlice} from '@reduxjs/toolkit';
export const LangSlice = createSlice({
  name: 'langToggle',
  initialState: {
    value: 'en',
  },
  reducers: {
    changeLang: (state, action) => {
      state.value = action.payload;
      console.log(action.payload, state.value);
    },
  },
});

export const {changeLang} = LangSlice.actions;

export default LangSlice.reducer;

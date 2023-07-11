import {configureStore} from '@reduxjs/toolkit';
import langReducer from './LangSlice';

export default configureStore({
  reducer: {
    langToggle: langReducer,
  },
});

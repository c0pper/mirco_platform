import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import fileSelectReducer from '../features/fileSelect/fileSelectSlice'

export const store = configureStore({
    reducer: {
      counter: counterReducer,
      fileSelect: fileSelectReducer,
    },
})
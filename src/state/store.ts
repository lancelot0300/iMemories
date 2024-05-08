import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/auth/authSlice'
import pathReducer from './features/path/pathSlice'
import activeRequests from './features/activeRequests/requestsSlice'
import filesReducer from './features/filesManager/filesSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    path: pathReducer,
    activeRequests: activeRequests,
    selectedFiles: filesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
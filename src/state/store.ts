import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/auth/authSlice'
import pathReducer from './features/path/pathSlice'
import activeRequests from './features/requests/requestsSlice'
import filesReducer from './features/files/filesSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    path: pathReducer,
    activeRequests: activeRequests,
    files: filesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/auth/authSlice'
import pathReducer from './features/path/pathSlice'
import activeRequests from './features/activeRequests/activeRequests'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    path: pathReducer,
    activeRequests: activeRequests
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
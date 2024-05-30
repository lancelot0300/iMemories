import { ActionCreatorWithPayload, ListenerMiddleware, Middleware, configureStore, isAction } from '@reduxjs/toolkit'
import usersReducer from './features/auth/authSlice'
import activeRequests from './features/requests/requestsSlice'
import filesReducer from './features/files/filesSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Response } from '../types'
import pathReducer from './features/path/pathSlice'
import getPathMiddleware from './middleware/filePathMIddleware'








export const store = configureStore({
  reducer: {
    user: usersReducer,
    path: pathReducer,
    activeRequests: activeRequests,
    files: filesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(getPathMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


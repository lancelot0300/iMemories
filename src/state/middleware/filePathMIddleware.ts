import { ListenerMiddleware, ThunkMiddleware } from '@reduxjs/toolkit';
import pathReducer, {  setNextPath, setPreviousPath, setPath, goBackToPath, setData, setPathAsync } from '../features/path/pathSlice'
import { RootState } from '../store';


const getPathMiddleware: ThunkMiddleware = (store) => (next) => (action) => {
    const { path } = store.getState() as RootState;
    const dispatch = store.dispatch;
    const actualPathInHistory = path.history?.findIndex(
      (historyPath) => historyPath.path === path.actualPath[path.actualPath.length - 1].path
    ) ?? -1;
  
    if(setPath.match(action)) {
      dispatch(setPathAsync(action.payload.path));
    }
  
    if(setNextPath.match(action)) {
      const nextPath = path.history[actualPathInHistory + 1]?.path;
      if (nextPath) {
        store.dispatch(setPathAsync(nextPath));
      }
    }
  
    if(setPreviousPath.match(action)) {
      const previousPath = path.history[actualPathInHistory - 1]?.path;
      if (previousPath || previousPath === "") {
        store.dispatch(setPathAsync(previousPath));
      }
    }
  
    if(goBackToPath.match(action)) {
      const goBackToPath = path.history[action.payload]?.path;
      if (goBackToPath) {
        store.dispatch(setPathAsync(goBackToPath));
      }
    }
  
    next(action);
  };

export default getPathMiddleware;
import React, { act, useEffect } from 'react'
import { isNextPathInHistory, refreshPathAsync, setActualPathAndFetchAsync, setNewPathAndFetchAsync, setUnkownPathAndFetchAsync } from '../../state/features/path/pathSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { ActiveFiles } from '../../types';

function usePathNavigation(allFilesRefs?: React.MutableRefObject<ActiveFiles[]>) {
    const { actualPath, history, dataFor, data } = useAppSelector((state) => state.path);
    const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isPreviousPath = actualPath.length > 1;
    const location = useLocation();
    const navigationType = useNavigationType();
  
    const handlePathChange = (pathIndex: number) => {
      if(allFilesRefs)
      {
        allFilesRefs.current = [];
      }
      dispatch(setActualPathAndFetchAsync(pathIndex));
      history[pathIndex].name === null
        ? navigate("/")
        : navigate(`/${history[pathIndex].id}`);
    };
  
    const setPreviousPath = (pathIndex: number) => {
      if (pathIndex < 0) return;
      dispatch(setActualPathAndFetchAsync(pathIndex));
      history[pathIndex].name === null
        ? navigate("/")
        : navigate(`/${history[pathIndex].id}`);
    };
  
    const setNextPath = (pathIndex: number) => {
        
      if (!isNextPath) return;
      dispatch(setActualPathAndFetchAsync(pathIndex));
      navigate(`/${history[pathIndex].id}`);
    };

    return {setNextPath, setPreviousPath, handlePathChange, isPreviousPath, actualPath, isNextPath}
}

export default usePathNavigation
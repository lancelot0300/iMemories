import React from "react";
import {
  CurrentPath,
  LogoutButton,
  MenuWrapper,
  Navigation,
  NavigationOption,
  PathSpan,
  RightOptionsWrapper,
} from "./menu.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  isNextPathInHistory,
  setActualPathAndFetchAsync,
  setUnkownPathAndFetchAsync,
} from "../../state/features/path/pathSlice";
import { ActiveFiles } from "../../types";
import { useNavigate } from "react-router-dom";

type Props = {
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

const Menu: React.FC<Props> = ({ allFilesRefs }) => {
  const { actualPath, history, data } = useAppSelector((state) => state.path);
  const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
  const navigate = useNavigate();
  const parentPath = data.parentFolderId
  const dispatch = useAppDispatch();
  console.log(isNextPath);

  const isPreviousPath = actualPath.length > 1;

  const handlePathChange = (pathIndex: number, action: Function) => {

    allFilesRefs.current = [];
    dispatch(action(pathIndex));
    navigate(`/${history[pathIndex].id}`);
  };

  const setPreviousPath = (pathIndex: number) => {

    if(parentPath && pathIndex < 0) {
      dispatch(setUnkownPathAndFetchAsync({path: parentPath}));
      navigate(`/${parentPath}`);
      return;
    }

    if(pathIndex < 0)  return;
    dispatch(setActualPathAndFetchAsync(pathIndex));
    navigate(`/${history[pathIndex].id}`);
  }

  const setNextPath = (pathIndex: number) => {
    if(!isNextPath) return;
    dispatch(setActualPathAndFetchAsync( pathIndex));
    navigate(`/${history[pathIndex].id}`);
  }

  const renderPath = () => {
    if (actualPath.length > 4) {
      return (
        <>
          <PathSpan onClick={() => handlePathChange(0, setActualPathAndFetchAsync)}>
            {actualPath[0].name}
          </PathSpan>
          <span> / ... / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 2, setActualPathAndFetchAsync)}>
            {actualPath[actualPath.length - 3].name}
          </PathSpan>
          <span> / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1, setActualPathAndFetchAsync)}>
            {actualPath[actualPath.length - 2].name}
          </PathSpan>
          <span> / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1, setActualPathAndFetchAsync)}>
            {actualPath[actualPath.length - 1].name}
          </PathSpan>
        </>
      );
    }

    return actualPath.map((path, index) => (
      <React.Fragment key={index}>
        <PathSpan onClick={() => handlePathChange(index, setActualPathAndFetchAsync)}>
          {path.name}
        </PathSpan>
        {index < actualPath.length - 1 && <span>\</span>}
      </React.Fragment>
    ));
  };

  return (
    <MenuWrapper>
      <Navigation>
        <NavigationOption $disabled={!isPreviousPath && !parentPath} onClick={() => setPreviousPath(actualPath.length - 2)}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </NavigationOption>
        <NavigationOption $disabled={!isNextPath} onClick={() => setNextPath(actualPath.length)}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </NavigationOption>
      </Navigation>
      <CurrentPath>{renderPath()}</CurrentPath>
      <RightOptionsWrapper>
        <LogoutButton>Logout</LogoutButton>
      </RightOptionsWrapper>
    </MenuWrapper>
  );
};

export default Menu;

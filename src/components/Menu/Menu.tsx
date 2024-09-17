import React from "react";
import {
  CurrentPath,
  Divider,
  LogoutButton,
  MenuWrapper,
  Navigation,
  NavigationOption,
  PathSpan,
  RightOptionsWrapper,
} from "./menu.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  isNextPathInHistory,
  setActualPathAndFetchAsync,
} from "../../state/features/path/pathSlice";
import { ActiveFiles } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../state/features/auth/authSlice";

type Props = {
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

const Menu: React.FC<Props> = ({ allFilesRefs }) => {
  const { actualPath, history } = useAppSelector((state) => state.path);
  const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPreviousPath = actualPath.length > 1;

  const checkIfPathNameIsNullOrUndefined = (
    path: string | undefined | null
  ) => {
    if (!path) return "Home";
    return path;
  };

  const handlePathChange = (pathIndex: number) => {
    allFilesRefs.current = [];
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

  const handleLogout = async () => {
    const url = `${process.env.REACT_APP_API_URL}/user/logout`;

    await axios.post(url, {
      withCredentials: true,
    });

  dispatch(logout())
  };

  const renderPath = () => {
    if (actualPath.length > 4) {
      return (
        <>
          <PathSpan onClick={() => handlePathChange(0)}>
            {checkIfPathNameIsNullOrUndefined(actualPath[0].name)}
          </PathSpan>
          <Divider>
            <span> / ... / </span>
          </Divider>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 2)}>
            {actualPath[actualPath.length - 3].name}
          </PathSpan>
          <Divider>
            <FontAwesomeIcon icon={faArrowRight} />
          </Divider>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1)}>
            {actualPath[actualPath.length - 2].name}
          </PathSpan>
          <Divider>
            <FontAwesomeIcon icon={faArrowRight} />
          </Divider>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1)}>
            {actualPath[actualPath.length - 1].name}
          </PathSpan>
        </>
      );
    }

    return actualPath.map((path, index) => (
      <React.Fragment key={index}>
        <PathSpan onClick={() => handlePathChange(index)}>
          {checkIfPathNameIsNullOrUndefined(path.name)}
        </PathSpan>
        {index < actualPath.length - 1 && (
          <Divider>
            <FontAwesomeIcon icon={faArrowRight} />
          </Divider>
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      <MenuWrapper>
        <Navigation>
          <NavigationOption
            $disabled={!isPreviousPath}
            onClick={() => setPreviousPath(actualPath.length - 2)}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </NavigationOption>
          <NavigationOption
            $disabled={!isNextPath}
            onClick={() => setNextPath(actualPath.length)}
          >
            <FontAwesomeIcon icon={faArrowRightLong} />
          </NavigationOption>
        </Navigation>
        <CurrentPath>{renderPath()}</CurrentPath>
        <RightOptionsWrapper>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </RightOptionsWrapper>
      </MenuWrapper>
    </>
  );
};

export default Menu;

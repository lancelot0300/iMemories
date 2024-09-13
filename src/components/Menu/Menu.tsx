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
  goBackToPath,
  isNextPathInHistory,
  setNextPath,
  setPreviousPath,
} from "../../state/features/path/pathSlice";
import { ActiveFiles } from "../../types";

type Props = {
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

const Menu: React.FC<Props> = ({ allFilesRefs }) => {
  const { actualPath } = useAppSelector((state) => state.path);
  const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
  const dispatch = useAppDispatch();

  const isPreviousPath = actualPath.length > 1;

  const handlePathChange = (pathIndex: number, action: Function) => {
    allFilesRefs.current = [];
    dispatch(action(pathIndex));
  };

  const renderPath = () => {
    if (actualPath.length > 4) {
      return (
        <>
          <PathSpan onClick={() => handlePathChange(0, goBackToPath)}>
            {actualPath[0].name}
          </PathSpan>
          <span> / ... / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 2, goBackToPath)}>
            {actualPath[actualPath.length - 3].name}
          </PathSpan>
          <span> / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1, goBackToPath)}>
            {actualPath[actualPath.length - 2].name}
          </PathSpan>
          <span> / </span>
          <PathSpan onClick={() => handlePathChange(actualPath.length - 1, goBackToPath)}>
            {actualPath[actualPath.length - 1].name}
          </PathSpan>
        </>
      );
    }

    return actualPath.map((path, index) => (
      <React.Fragment key={index}>
        <PathSpan onClick={() => handlePathChange(index, goBackToPath)}>
          {path.name}
        </PathSpan>
        {index < actualPath.length - 1 && <span>\</span>}
      </React.Fragment>
    ));
  };

  return (
    <MenuWrapper>
      <Navigation>
        <NavigationOption $disabled={!isPreviousPath} onClick={() => handlePathChange(actualPath.length - 2, setPreviousPath)}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </NavigationOption>
        <NavigationOption $disabled={!isNextPath} onClick={() => handlePathChange(actualPath.length, setNextPath)}>
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

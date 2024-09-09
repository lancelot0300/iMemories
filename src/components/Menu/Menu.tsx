import React, { useEffect, useRef, useState } from "react";
import {
  CurrentPath,
  LogoutButton,
  MenuWrapper,
  Navigation,
  NavigationOption,
  PathSpan,
} from "./menu.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import RightSideMenu from "../RightSideMenu/RightSideMenu";
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

function Menu({ allFilesRefs }: Props) {
  const { actualPath } = useAppSelector((state) => state.path);
  const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
  const dispatch = useAppDispatch();

  const isPreviousPath = actualPath.length > 1;
  const previousPathIndex = actualPath.length - 2;
  const nextPathIndex = actualPath.length;

  const handlePreviousPath = () => {
    if (!isPreviousPath) return;
    allFilesRefs.current = [];
    dispatch(setPreviousPath(previousPathIndex));
  };

  const handleBackToPath = (index: number) => {
    if (index === actualPath.length - 1) return;
    allFilesRefs.current = [];
    dispatch(goBackToPath(index));
  };

  const handleNextPath = () => {
    if (!isNextPath) return;
    allFilesRefs.current = [];
    dispatch(setNextPath(nextPathIndex));
  };

  const renderPath = () => {
    if (actualPath.length > 4) {
      return (
        <>
          <PathSpan onClick={() => handleBackToPath(0)}>
            {actualPath[0].name}
          </PathSpan>
          <span> / ... / </span>
          <PathSpan onClick={() => handleBackToPath(actualPath.length - 2)}>
            {actualPath[actualPath.length - 2].name}
          </PathSpan>
          <span> / </span>
          <PathSpan onClick={() => handleBackToPath(actualPath.length - 1)}>
            {actualPath[actualPath.length - 1].name}
          </PathSpan>
        </>
      );
    }
    else {
      return actualPath.map((path, index) => (
        <React.Fragment key={index}>
          <PathSpan onClick={() => handleBackToPath(index)}>
            {path.name}
          </PathSpan>
          {index < actualPath.length - 1 && <span> / </span>}
        </React.Fragment>
      ));
    }
  };

  return (
    <>
    {console.log("Menu")}
      <MenuWrapper>
        <Navigation>
          <NavigationOption
            $disabled={!isPreviousPath}
            onClick={handlePreviousPath}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </NavigationOption>
          <NavigationOption $disabled={!isNextPath} onClick={handleNextPath}>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </NavigationOption>
        </Navigation>
        <CurrentPath>
          {renderPath()}
        </CurrentPath>
        <RightSideMenu>
          <LogoutButton> Logout </LogoutButton>
        </RightSideMenu>
      </MenuWrapper>
    </>
  );
}

export default Menu;

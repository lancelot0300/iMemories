import React, { useEffect, useRef, useState } from "react";
import {
  CurrentPath,
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
import UploadOption from "../UploadOption/UploadOption";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  goBackToPath,
  setNextPath,
  setPreviousPath,
} from "../../state/features/path/pathSlice";
import { ActiveFiles } from "../../types";
import { all } from "axios";

type Props = {
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

function Menu({ allFilesRefs }: Props) {
  const { actualPath, history } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();
  const actualPathInHistory =
    history?.findIndex(
      (path) => path.path === actualPath[actualPath.length - 1].path
    ) ?? -1;
  const isPreviousPath = actualPathInHistory > 0;
  const isNextPath = history && actualPathInHistory < history.length - 1;



  const handlePreviousPath = () => {
    if (!isPreviousPath) return;
    allFilesRefs.current = [];
    dispatch(setPreviousPath());
  };

  const handleBackToPath = (index: number) => {
    if (index === actualPath.length - 1) return;
    allFilesRefs.current = [];
    dispatch(goBackToPath(index));
  };

  const handleNextPath = () => {
    if (!isNextPath) return;
    allFilesRefs.current = [];
    dispatch(setNextPath(actualPathInHistory + 1));
  };

  return (
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
        {actualPath.map((path, index) => (
          <React.Fragment key={index}>
            <PathSpan onClick={() => handleBackToPath(index)}>
              {path.name}
            </PathSpan>
            {index < actualPath.length - 1 && <span> / </span>}
          </React.Fragment>
        ))}
      </CurrentPath>
      <RightSideMenu>
        <UploadOption />
      </RightSideMenu>
    </MenuWrapper>
  );
}

export default Menu;

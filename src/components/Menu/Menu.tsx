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

type Props = {
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
};

function Menu({ allFilesRefs }: Props) {
  const { actualPath, history } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();

  const isPreviousPath = actualPath.length > 1;
  const isNextPath = history.length > actualPath.length;
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

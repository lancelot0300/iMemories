import React, { useEffect, useRef, useState } from "react";
import {
  CurrentPath,
  MenuWrapper,
  Navigation,
  NavigationOption,
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

function Menu() {
  const { actualPath, history } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();
  const actualPathInHistory = history?.findIndex(
    (path) => path.path === actualPath[actualPath.length - 1].path
  ) ?? -1;
  const isPreviousPath = actualPathInHistory > 0;
  const isNextPath = history && actualPathInHistory < history.length - 1;

  const handlePreviousPath = () => {
    if (!isPreviousPath) return;
    dispatch(setPreviousPath());
  };

  const handleBackToPath = (index: number) => {
    console.log(index);
    dispatch(goBackToPath(index));
  };

  const handleNextPath = () => {
    if (!isNextPath) return;
    dispatch(setNextPath(actualPathInHistory + 1));
  }

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
            <span onClick={() => handleBackToPath(index)}>{path.name}</span>
            {index < actualPath.length - 1 && (
              <FontAwesomeIcon
                icon={faArrowRightLong}
                style={{ margin: "0 8px" }}
              />
            )}
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

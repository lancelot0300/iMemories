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
import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";
import { previousPath } from "../../state/features/path/pathSlice";

function Menu() {
  const { actualPath } = useAppSelector((state) => state.path);
  const dispatch = useAppDispatch();

  const isDisabled = actualPath.length === 1;

  const handlePreviousPath = () => {
    if(isDisabled) return
     dispatch(previousPath());
  }

  return (
    <MenuWrapper>
      <Navigation>
        <NavigationOption $disabled={isDisabled}  onClick={handlePreviousPath}>
          <FontAwesomeIcon  icon={faArrowLeftLong}/>
        </NavigationOption>
        <NavigationOption>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </NavigationOption>
      </Navigation>
      <CurrentPath>
        {actualPath.map((path, index) => (
          <React.Fragment key={index}>
            <span>{path.name}</span>
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

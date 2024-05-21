import React, { useEffect, useRef } from "react";
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

function Menu() {
  return (
    <MenuWrapper>
      <Navigation>
        <NavigationOption>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </NavigationOption>
        <NavigationOption>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </NavigationOption>
      </Navigation>
      <CurrentPath>Home</CurrentPath>
      <RightSideMenu>
        <UploadOption />
      </RightSideMenu>
    </MenuWrapper>
  );
}

export default Menu;

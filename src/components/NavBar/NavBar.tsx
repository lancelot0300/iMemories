import React from "react";
import {
  LeftOptionsWrapper,
  NavBarContainer,
  NavBarItem,
  RightOptionsWrapper,
} from "./navBar.styles";

function NavBar() {
  return (
    <NavBarContainer>
      <LeftOptionsWrapper>
        <NavBarItem>Settings</NavBarItem>
      </LeftOptionsWrapper>
      <RightOptionsWrapper>
        <NavBarItem>Download</NavBarItem>
        <NavBarItem>Copy</NavBarItem>
        <NavBarItem>Move</NavBarItem>
        <NavBarItem>Delete</NavBarItem>
        <NavBarItem>Upload</NavBarItem>
      </RightOptionsWrapper>
    </NavBarContainer>
  );
}

export default NavBar;

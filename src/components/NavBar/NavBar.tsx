import {
  LeftOptionsWrapper,
  NavBarContainer,
  NavBarItem,
  RightOptionsWrapper,
} from "./navBar.styles";
import DownloadOption from "./DownloadOption/DownloadOption";
import CopyOption from "./CopyOption/CopyOption";
import DeleteOption from "./DeleteOption/DeleteOption";
import UploadOption from "./UploadOption/UploadOption";



function NavBar() {
  return (
    <NavBarContainer>
      <LeftOptionsWrapper>
        <NavBarItem>Settings</NavBarItem>
      </LeftOptionsWrapper>
      <RightOptionsWrapper>
        <DownloadOption />
        <CopyOption />
        <DeleteOption />
        <UploadOption />
      </RightOptionsWrapper>
    </NavBarContainer>
  );
}

export default NavBar;

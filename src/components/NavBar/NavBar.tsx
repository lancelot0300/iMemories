import {
  LeftOptionsWrapper,
  NavBarContainer,
  NavBarItem,
  RightOptionsWrapper,
} from "./navBar.styles";
import { Item } from "../../intefaces";
import DownloadOption from "./DownloadOption/DownloadOption";
import CopyOption from "./CopyOption/CopyOption";
import DeleteOption from "./DeleteOption/DeleteOption";
import UploadOption from "./UploadOption/UploadOption";

type NavBarProps = {
  selectedElement: Item | null;
};

function NavBar({ selectedElement }: NavBarProps) {
  return (
    <NavBarContainer>
      <LeftOptionsWrapper>
        <NavBarItem>Settings</NavBarItem>
      </LeftOptionsWrapper>
      <RightOptionsWrapper>
        <DownloadOption selectedElement={selectedElement} />
        <CopyOption selectedElement={selectedElement} />
        <DeleteOption selectedElement={selectedElement} />
        <UploadOption />
      </RightOptionsWrapper>
    </NavBarContainer>
  );
}

export default NavBar;

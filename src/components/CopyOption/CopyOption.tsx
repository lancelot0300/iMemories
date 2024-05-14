import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";
import useCopy from "../../hooks/useCopy/useCopy";
import { ActiveFiles } from "../../types";
import { NavBarItem } from "../NavBar/navBar.styles";


function CopyOption() {
  const {handleCopyClick} = useCopy()

  return <NavBarItem onClick={handleCopyClick}>Copy</NavBarItem>;
}

export default CopyOption;

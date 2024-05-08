import { useAppSelector } from "../../../hooks/stateHook/useStateHook";
import { NavBarItem } from "../navBar.styles";



function CopyOption() {
  const { selectedFiles } = useAppSelector((state) => state.selectedFiles);

  const handleCopyClick = () => {
    if (selectedFiles) {
      console.log("Copy: ", selectedFiles);
    } else {
      alert("Select an item to download");
    }
  };

  return <NavBarItem onClick={handleCopyClick}>Copy</NavBarItem>;
}

export default CopyOption;

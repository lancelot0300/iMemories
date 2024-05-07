import {  SelectedElements } from "../../../types";
import { NavBarItem } from "../navBar.styles";

type CopyOptionProps = {
  selectedElement: SelectedElements;
};

function CopyOption({ selectedElement }: CopyOptionProps) {
  const handleCopyClick = () => {
    if (selectedElement) {
      console.log("Copy: ", selectedElement);
    } else {
      alert("Select an item to download");
    }
  };

  return <NavBarItem onClick={handleCopyClick}>Copy</NavBarItem>;
}

export default CopyOption;

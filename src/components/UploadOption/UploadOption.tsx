import useUpload from "../../hooks/useUpload/useUpload";
import { NavBarItem } from "../NavBar/navBar.styles";

function UploadOption() {

  const { createModal, setIsOpened } = useUpload();

  return (
    <>
      <NavBarItem onClick={() => setIsOpened(true)}>Upload</NavBarItem>
      {createModal()}
    </>
  );
}

export default UploadOption;

import { useAppSelector } from '../../../hooks/stateHook/useStateHook';
import { NavBarItem } from '../navBar.styles'


function DownloadOption() {
  const { selectedFiles } = useAppSelector((state) => state.selectedFiles);

  const handleDownloadClick = () => {
    if(selectedFiles) {
      console.log("Downloading: ", selectedFiles)
    }
    else {
      alert("Select an item to download")
    }
  }

  return (
    <NavBarItem onClick={handleDownloadClick}>Download</NavBarItem>
  )
}

export default DownloadOption
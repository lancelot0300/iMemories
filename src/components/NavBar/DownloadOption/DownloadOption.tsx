import { Item } from '../../../intefaces'
import { NavBarItem } from '../navBar.styles'

type DownloadOptionProps = {
  selectedElement: Item | null;
}

function DownloadOption({selectedElement} : DownloadOptionProps) {


  const handleDownloadClick = () => {
    if(selectedElement) {
      console.log("Downloading: ", selectedElement)
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
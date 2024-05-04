import { Item, SelectedElements } from '../../../types'
import { NavBarItem } from '../navBar.styles'

type DownloadOptionProps = {
  selectedElement: SelectedElements[];
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
import {  SelectedElements } from '../../../types'
import { NavBarItem } from '../navBar.styles'

type DeleteOptionProps = {
  selectedElement: SelectedElements;
}

function DeleteOption({selectedElement} : DeleteOptionProps) {


  const handleDeleteClick = () => {
    if(selectedElement) {
      console.log("Deleting: ", selectedElement)
    }
    else {
      alert("Select an item to Delete")
    }
  }

  return (
    <NavBarItem onClick={handleDeleteClick}>Delete</NavBarItem>
  )
}

export default DeleteOption
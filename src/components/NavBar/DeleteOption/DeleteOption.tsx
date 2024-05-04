import { Item } from '../../../intefaces'
import { NavBarItem } from '../navBar.styles'

type DeleteOptionProps = {
  selectedElement: Item | null;
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
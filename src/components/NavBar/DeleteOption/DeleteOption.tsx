import { useAppSelector } from '../../../hooks/stateHook/useStateHook';
import { NavBarItem } from '../navBar.styles'

function DeleteOption() {
  const { selectedFiles } = useAppSelector((state) => state.selectedFiles);


  const handleDeleteClick = () => {
    if(selectedFiles) {
      console.log("Deleting: ", selectedFiles)
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
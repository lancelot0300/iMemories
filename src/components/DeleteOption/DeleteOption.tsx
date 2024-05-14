import useDelete from '../../hooks/useDelete/useDelete';
import { NavBarItem } from '../NavBar/navBar.styles';


type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteOption() {

  const {handleDeleteClick} = useDelete()

  return (
    <NavBarItem onClick={handleDeleteClick}>Delete</NavBarItem>
  )
}

export default DeleteOption
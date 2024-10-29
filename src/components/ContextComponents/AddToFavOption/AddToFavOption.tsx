import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function AddToFavOption({setIsOpened}: Props) {
    
  

    return (
      <ContextOption onClick={() => {}}><FontAwesomeIcon icon={faStar} /><span>Favourite</span></ContextOption>
    )
}

export default AddToFavOption
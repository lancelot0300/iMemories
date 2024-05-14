import React from 'react'
import useDelete from '../../hooks/useDelete/useDelete'
import { ContextOption } from '../FileElement/fileElement.styles'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteContextOption({setIsOpened}: Props) {
    const {handleDeleteClick} = useDelete(setIsOpened)

    return (
      <ContextOption onClick={handleDeleteClick}>Delete</ContextOption>
    )
}

export default DeleteContextOption
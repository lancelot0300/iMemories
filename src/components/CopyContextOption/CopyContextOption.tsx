import React from 'react'
import useCopy from '../../hooks/useCopy/useCopy'
import { ContextOption } from '../FileElement/fileElement.styles'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}


function CopyContextOption({setIsOpened}: Props) {
    const {handleCopyClick} = useCopy(setIsOpened)

    return (
      <ContextOption onClick={handleCopyClick}>Copy</ContextOption>
    )
}

export default CopyContextOption
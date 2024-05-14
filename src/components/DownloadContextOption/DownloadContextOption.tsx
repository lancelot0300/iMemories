import React from 'react'
import { ContextOption } from '../FileElement/fileElement.styles'
import useDownload from '../../hooks/useDownload/useDownload'

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function DownloadContextOption({setIsOpened}: Props) {
    const {handleDownloadClick} = useDownload(setIsOpened)

  return (
    <ContextOption onClick={handleDownloadClick}>Download</ContextOption>
  )
}

export default DownloadContextOption
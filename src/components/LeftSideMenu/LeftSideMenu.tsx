import React, { PropsWithChildren } from 'react'
import { LeftOptionsWrapper} from '../NavBar/navBar.styles'

function LeftSiedeMenu({children}: PropsWithChildren) {
  return (
    <LeftOptionsWrapper>
        {children}
    </LeftOptionsWrapper>
  )
}

export default LeftSiedeMenu
import React, { PropsWithChildren } from 'react'
import { LeftOptionsWrapper, NavBarItem } from '../NavBar/navBar.styles'

function LeftSiedeMenu({children}: PropsWithChildren) {
  return (
    <LeftOptionsWrapper>
        {children}
    </LeftOptionsWrapper>
  )
}

export default LeftSiedeMenu
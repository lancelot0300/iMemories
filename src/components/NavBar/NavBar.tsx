import React, { PropsWithChildren } from 'react'
import { NavBarContainer } from './navBar.styles'

function NavBar({children}: PropsWithChildren) {
  return (
    <NavBarContainer>
        {children}
    </NavBarContainer>
  )
}

export default NavBar
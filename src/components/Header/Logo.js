import React from 'react'
import { Image } from 'semantic-ui-react'

import headerLogo from '../../images/logo.png'

const Logo = () => (
  <Image
    size="mini"
    src={headerLogo}
    style={{ marginRight: '1.5em' }}
    alt="Header Logo"
  />
)

export default Logo

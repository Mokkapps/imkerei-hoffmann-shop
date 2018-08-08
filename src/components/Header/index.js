import React from 'react'
import { Responsive } from 'semantic-ui-react'

import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            location={this.props.location}
            // cartCount={this.props.cart.cartCount} // FIXME
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu
            location={this.props.location}
            // cartCount={this.props.cart.cartCount} //FIXME
          />
        </Responsive>
      </div>
    )
  }
}

export default Header

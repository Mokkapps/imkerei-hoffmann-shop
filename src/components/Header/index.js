import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Responsive } from 'semantic-ui-react'

import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const mapStateToProps = state => {
  return { cartCount: state.cartCount }
}

class ConnectedHeader extends React.PureComponent {
  render() {
    return (
      <div>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            location={this.props.location}
            cartCount={this.props.cartCount}
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu
            location={this.props.location}
            cartCount={this.props.cartCount}
          />
        </Responsive>
      </div>
    )
  }
}

ConnectedHeader.propTypes = {
  cartCount: PropTypes.number.isRequired,
}

const Header = connect(
  mapStateToProps,
  null
)(ConnectedHeader)

export default Header

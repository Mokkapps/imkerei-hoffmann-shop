import React, { Component } from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { Menu, Container } from 'semantic-ui-react'

import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

class DesktopMenu extends Component {
  state = {
    activeItem: this.props.location.pathname,
  }

  componentWillReceiveProps(nextProps) {
    const nextPathname = nextProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (nextPathname !== currentPathname) {
      this.setState({
        activeItem: nextPathname,
      })
    }
  }

  render() {
    const { activeItem } = this.state
    const { cartCount } = this.props
    return (
      <Menu size="huge" borderless pointing>
        <Container text>
          <Menu.Item
            active={activeItem === withPrefix('/')}
            as={Link}
            to="/"
            header
          >
            <Logo />
            Imkerei Hoffmann Shop
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/cart/"
              active={activeItem === withPrefix('/cart/')}
            >
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

export default DesktopMenu

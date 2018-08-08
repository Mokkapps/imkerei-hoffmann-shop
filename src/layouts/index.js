import React from 'react'
import { Container } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'

import 'semantic-ui-css/semantic.min.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Layout extends React.PureComponent {
  render() {
    const { location, children } = this.props

    return (
      <div>
        <Helmet
          meta={[
            {
              name: 'description',
              content: 'Shop website for our family-run honey farm ',
            },
            { name: 'keywords', content: 'ecommerce, gatsby, hoffmann, imkerei' },
            { name: 'theme-color', content: '#ffffff' },
          ]}
        >
          <html lang="en" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix('/favicons/apple-touch-icon.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix('/favicons/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix('/favicons/favicon-16x16.png')}
          />
        </Helmet>
        <Headroom
          upTolerance={10}
          downTolerance={10}
          style={{ zIndex: '20', height: '6.5em' }}
        >
          <Header location={location} />
        </Headroom>
        <Container text>{children()}</Container>
        <Footer />
      </div>
    )
  }
}

export default Layout

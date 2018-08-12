import React from 'react'
import Link from 'gatsby-link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'

const Footer = () => (
  <Segment
    vertical
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h4" content="Rechtliches" />
            <List>
              <List.Item as={Link} to="/privacy/">
                Privacy
              </List.Item>
              <List.Item as={Link} to="/terms/">
                Terms
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="Services" />
            <List>
              <List.Item as={Link} to="/">
                Unsere Produkte
              </List.Item>
              <List.Item as={Link} to="/team">
                Das Team
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">Über uns</Header>
            <p>Wir sind ein Familienbetrieb aus Niederbayern</p>
            <p>Entwickelt mit von &hearts; von <a href="https://mokkapps.de">Mokkapps</a></p>
            <List horizontal>
              <List.Item
                icon="mail"
                content={
                  <a href="mailto:kontakt@hoffmann-imkerei.de" alt="email link">
                    Email
                  </a>
                }
              />
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Footer

import React from 'react'
import Img from 'gatsby-image'
import { Card } from 'semantic-ui-react'

const getColumns = data =>
  data.allTeamJson.edges.map(t => t.node).map(teamMember => {
    const { name, imageId, description, role } = teamMember
    return (
      <Card>
        <Img resolutions={data[imageId].resolutions} alt={name} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{role}</span>
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>
    )
  })

const TeamPage = ({ data }) => (
  <section>
    <h1>Das Team</h1>
    <p>Wir sind ein Familienbetrieb und folgende Leute sind beteiligt:</p>
    <Card.Group>{getColumns(data)}</Card.Group>
  </section>
)

export default TeamPage

export const query = graphql`
  query Team {
    allTeamJson {
      edges {
        node {
          name
          imageId
          role
          description
        }
      }
    }
    team1: imageSharp(id: { regex: "/team1/" }) {
      resolutions(width: 250, height: 250) {
        ...GatsbyImageSharpResolutions
      }
    }
    team2: imageSharp(id: { regex: "/team2/" }) {
      resolutions(width: 250, height: 250) {
        ...GatsbyImageSharpResolutions
      }
    }
    team3: imageSharp(id: { regex: "/team3/" }) {
      resolutions(width: 250, height: 250) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`

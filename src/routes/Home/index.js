import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { thanosRoutes } from 'helpers'

const propTypes = {}

const HomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background: #4d8ffb;
`

const Heading = styled.h1`
  margin-bottom: 0px;
  color: var(--white);
  font-weight: 500;
`

const SecText = styled.span`
  font-size: .9em;
  color: var(--white);
`

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 700px;
  width: 90%;
  margin: 4em 0em;
  a{
    display: block;
    text-decoration: none;
    text-align: center;
    background: var(--white);
    width: 45%;
    padding: 2em;
    cursor: pointer;
    border-radius: 3px;
    color: #4d8ffb;
  }
`

const NavigationCard = styled.div`
  font-size: 2em;
  font-weight: 300;
`

const IconSection = styled.div`
  i{
    font-size: 5em;
    margin-bottom: 2rem;
  }
`

const CreatedBy = styled.div`
  text-align: center;
  font-size: .9em;
  margin-bottom: 2em;
  color: var(--white);
  a{
    font-weight: 500;
    color: var(--white);
    text-decoration: none;
  }
`

const Home = (props) => {
  return (
    <HomeSection>
      <Heading>Welcome to Thanos</Heading>
      <SecText>These are what you can do in Thanos</SecText>
      <CardsContainer>
        <Link to={thanosRoutes.CONTACTS_ROUTE} >
          <NavigationCard>
            <IconSection>
              <i className="far fa-address-book" />
            </IconSection>
            <span>Contacts</span>
          </NavigationCard>
        </Link>
        <Link to={thanosRoutes.BRACKET_MATCHER_ROUTE} >
          <NavigationCard>
            <IconSection>
              <i className="fas fa-code" />
            </IconSection>
            <span>Bracket validator</span>
          </NavigationCard>
        </Link>
      </CardsContainer>
      <CreatedBy>
        Created by: <a href="https://www.syamsp.com" target="_blank" rel="noopener">Syam Pillai</a>
      </CreatedBy>
    </HomeSection>
  )
}

Home.propTypes = propTypes

export default Home

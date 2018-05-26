import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { thanosRoutes } from 'helpers'

const propTypes = {}

const HomeSection = styled.div`

`

const Heading = styled.h1`

`

const SecText = styled.span`

`

const CardsContainer = styled.div`

`

const NavigationCard = styled.div`

`

const Home = (props) => {
  return (
    <HomeSection>
      <Heading>Welcome</Heading>
      <SecText>Click on the card to select the page</SecText>
      <CardsContainer>
        <Link to={thanosRoutes.CONTACTS_ROUTE} >
          <NavigationCard>
            Contacts
          </NavigationCard>
        </Link>
      </CardsContainer>
    </HomeSection>
  )
}

Home.propTypes = propTypes

export default Home

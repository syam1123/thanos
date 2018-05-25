import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  contact: PropTypes.object.isRequired
}

const EachContactRow = (props) => {
  const { contact } = props;
  return (
    <div >{contact.firstname}</div>
  )
}

EachContactRow.propTypes = propTypes

export default EachContactRow;

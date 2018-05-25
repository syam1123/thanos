import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  contact: PropTypes.object.isRequired
}

const EachRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em;
  justify-content: space-between;
  &:nth-child(2n) {
    background: #eee;
  }
`

const EachField = styled.div`
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #444;
`

const EachContactRow = (props) => {
  const { contact, renderValidField } = props;
  const { firstname, lastname, email, agency_name} = contact
  return (
    <EachRow >
      <EachField>{renderValidField(firstname)} {renderValidField(lastname)} {!(renderValidField(firstname) || renderValidField(lastname)) && 'Name unavailable'}</EachField>
      <EachField>{renderValidField(email)? email: 'N/A'}</EachField>
      <EachField>{renderValidField(agency_name)? agency_name: 'N/A'}</EachField>
    </EachRow>
  )
}

EachContactRow.propTypes = propTypes

export default EachContactRow;

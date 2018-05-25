import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

const propTypes = {}

class Contacts extends Component {
  render () {
    const { contacts } = this.props;
    console.log("contacts", contacts);
    return(
      <div>Contacts will come here</div>
    );
  }
}

Contacts.propTypes = propTypes

function mapStateToProps(state) {
  const { contacts } = state
  return{
    contacts
  }
}

export default connect(mapStateToProps)(Contacts)

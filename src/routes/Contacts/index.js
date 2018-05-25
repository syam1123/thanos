import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getContacts } from 'actions'
import { EachContactRow } from 'components'

const propTypes = {
  contacts: PropTypes.array.isRequired
}

const ContactsContainer = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 2em auto;
  background: var(--white);
  box-shadow: 0px 0px 4px 1px #ededed;
`

const TableContainer = styled.div`

`

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

const TableHead = styled.div`
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const EachHead = styled.div`
  width: 30%;
  font-weight: 900;
`

const SearchBar = styled.div`
  background: #4285f4;
  height: 50px;
  padding: .3em;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchSection = styled.div`
  width: 90%;
  max-width: 600px;
  input{
    width: 100%;
    padding: .5em 2em;
    border: none;
    background: rgba(255,255,255,.15);
    outline: none;
    border-radius: 5px;
    transition: all linear .3s;
    &::placeholder{
      color: var(--white);
    }
    &:focus, &:active{
      background: rgba(255,255,255,.75);
      transition: all linear .3s;
      &::placeholder{
        color: #444;
      }
    }
  }
`

class Contacts extends Component {

  constructor (props) {
  	super(props);
    const { contacts } = this.props;
  	this.state = {
      limit: 50,
      totalContacts: contacts.length,
      scrollOffset: window.pageYOffset,
      searchField: ''
    };
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    dispatch(getContacts());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts != this.props.contacts) {
      this.setState({totalContacts: nextProps.contacts.length})
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  renderValidField = (value) => {
    if (!value || (!!value && value.toLowerCase() == 'null'))
      return null;
    return value;
  }

  handleScroll = () => {
    const { limit, totalContacts, scrollOffset } = this.state;
    if (window.pageYOffset < scrollOffset)
      return
    console.log("scrolling", limit, totalContacts);
    if (limit > totalContacts)
      return
    console.log("coming until here");
    this.setState({limit: limit+1, scrollOffset: window.pageYOffset})
  }

  handleSearchInput = (e) => {
    this.setState({searchField: e.target.value})
  }

  renderEachRow = (contact, index) => {
    const { firstname, lastname, email, agency_name} = contact
    return (
      <EachRow key={index}>
        <EachField>{this.renderValidField(firstname)} {this.renderValidField(lastname)} {!(this.renderValidField(firstname) || this.renderValidField(lastname)) && 'Name unavailable'}</EachField>
        <EachField>{this.renderValidField(email)? email: 'N/A'}</EachField>
        <EachField>{this.renderValidField(agency_name)? agency_name: 'N/A'}</EachField>
      </EachRow>
    )
  }

  renderSearchBar = () => {
    return (
      <SearchBar>
        <SearchSection>
          <input type="text" placeholder="Search for a contact" value={this.state.searchField} onChange={this.handleSearchInput} />
        </SearchSection>
      </SearchBar>
    )
  }

  renderTableHead = () => {
    return (
      <TableHead>
        <EachHead>Name</EachHead>
        <EachHead>Email</EachHead>
        <EachHead>Agency</EachHead>
      </TableHead>
    )
  }

  render = () => {
    const { contacts } = this.props;
    const { searchField } = this.state;
    const filteredContacts = contacts.filter((contact) => {
      const { firstname, lastname, email, agency_name } = contact;
      return (
        firstname && firstname.toString().toLowerCase().includes(searchField.toLowerCase()) ||
        lastname && lastname.toString().toLowerCase().includes(searchField.toLowerCase()) ||
        email && email.toString().toLowerCase().includes(searchField.toLowerCase()) ||
        agency_name && agency_name.toString().toLowerCase().includes(searchField.toLowerCase()))
      })
    let contactsToShow = filteredContacts.slice(0, this.state.limit)
    return(
      <ContactsContainer id="contactsContainer">
        {this.renderSearchBar()}
        <TableContainer>
          {this.renderTableHead()}
          { contactsToShow && contactsToShow.map((contact, index) => {
            if (index >= this.state.limit)
              return null;
            return this.renderEachRow(contact, index)
          })}
        </TableContainer>
      </ContactsContainer>
    );
  }
}

Contacts.propTypes = propTypes

function mapStateToProps(state) {
  const { contacts } = state.appReducer
  return{
    contacts
  }
}

export default connect(mapStateToProps)(Contacts)

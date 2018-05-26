import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getContacts, recieveContacts } from 'actions'
import { EachContactRow, Loader } from 'components'

const propTypes = {
  /*
    Array of contacts from the json
   */
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
  color: var(--dark-gray);
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
  height: 60px;
  padding: .3em;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchSection = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  align-items: center;
  margin-right: -2.5em;
  input{
    width: 100%;
    padding: .75em 2em;
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
        color: var(--dark-gray);
      }
    }
  }
`

const SearchIcon = styled.div`
  width: 2em;
  margin-right: -2.5em;
  display: flex;
  color: white;
`

const TotalLoaded = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  background: #fc7712;
  border-radius: 3px;
  box-shadow: 0px 0px 4px 1px #f0743052;
  padding: 1em;
  color: white;
  p{
    text-align: center;
    margin: 0em;
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
    const { dispatch } = this.props;
    window.removeEventListener('scroll', this.handleScroll);
    /*
      Clear store on unmounting
     */
    dispatch(recieveContacts([]));
  }

  /**
   * Some feild may contain 'NULL' as value
   * Remove pseudo strings or undefined values
   * @param  {string} value Value to be checked as valid or not
   * @return {string}       Valid string only
   */
  renderValidField = (value) => {
    if (!value || (!!value && value.toString().toLowerCase() == 'null'))
      return null;
    return value;
  }

  /**
   * Handling scroll as to fetch more data from json and update the limit in the state
   * It will fetch more data from contacts in the render function
   * Handle scroll down and scroll up: Fetch data only on scrolling down
   */
  handleScroll = () => {
    const { limit, totalContacts, scrollOffset } = this.state;
    if (window.pageYOffset < scrollOffset)
      return
    if (limit > totalContacts)
      return
    this.setState({limit: limit+1, scrollOffset: window.pageYOffset})
  }

  /**
   * Manages each keypress in input seach feild
   * @param  {object} e Event triggeres on keypress
   */
  handleSearchInput = (e) => {
    this.setState({searchField: e.target.value})
  }

  /**
   * Renders a single user's details in a row
   * @param  {object} contact single user details
   * @param  {number} index   unique key for each user
   * @return {node}         HTML component
   */
  renderEachRow = (contact, index) => {
    return (
      <EachContactRow
        key={index}
        contact={contact}
        renderValidField={this.renderValidField}
      />
    )
  }

  /**
   * @return {node} Renders the Search bar and container above the table
   */
  renderSearchBar = () => {
    return (
      <SearchBar>
        <SearchSection>
          <SearchIcon>
            <i className="fas fa-search" />
          </SearchIcon>
          <input type="text" placeholder="Search for a contact" value={this.state.searchField} onChange={this.handleSearchInput} />
        </SearchSection>
      </SearchBar>
    )
  }

  /**
   * @return {node} The header section of the table
   */
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

    /*
      Show loader till initial loading of json is comlete
     */
    if (contacts.length == 0) {
      return (
        <Loader />
      )
    }

    /*
      Filter the contacts array with the search input
     */
    const filteredContacts = contacts.filter((contact) => {
      const { firstname, lastname, email, agency_name } = contact;
      const filterFields = [firstname, lastname, email, agency_name]
      return filterFields.find(item => item.toString().toLowerCase().includes(searchField.toLowerCase()))
    })

    /*
      Slice the data as to render only limitted number of contacts
     */
    let contactsToShow = filteredContacts.slice(0, this.state.limit)

    return(
      <ContactsContainer id="contactsContainer">
        {this.renderSearchBar()}
        <TableContainer>
          {this.renderTableHead()}
          { contactsToShow && contactsToShow.map((contact, index) => {
            // Render each row
            return this.renderEachRow(contact, index)
          })}
        </TableContainer>
        <TotalLoaded>
          <p>{this.state.limit}</p>
        </TotalLoaded>
      </ContactsContainer>
    );
  }
}

Contacts.propTypes = propTypes

/*
  Fetch data from the store and pass as props
 */
function mapStateToProps(state) {
  const { contacts } = state.appReducer
  return{
    contacts
  }
}

export default connect(mapStateToProps)(Contacts)

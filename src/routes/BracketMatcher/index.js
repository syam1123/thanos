import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { thanosConstants } from 'helpers'

const propTypes = {}

const EditorPage = styled.div`
  min-height: 100vh;
  background: rgb(33, 37, 43);
`

const EditorSection = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 1em;
  justify-content: center;
`

const TextArea = styled.textarea`
  background: rgb(57, 62, 71);
  color: rgb(209, 154, 102);
  height: 70%;
  display: block;
  border-radius: 3px;
  border: none;
  outline: none;
  padding: 1rem;
  font-size: .9em
`

const ButtonContainer = styled.div`
  text-align: center;
  padding: 1em;
  background: #222;
`

const Button = styled.button`
  border: 1px solid white;
  color: white;
  outline: none;
  padding: 0.5em 2em;
  font-size: .9em;
  border-radius: 3px;
  cursor: pointer;
`

const ResultContainer = styled.div`
  background: white;
  height: 20%;
  .result-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const ResultHead = styled.h1`
  text-align: center;
  color: red;
  margin: 0;
  ${props => props.isvalid && css`
    color: green;
  `}
`

const ErrorDetails = styled.p`
  text-align: center;
  color: var(--dark-gray);
`

class BracketMatcher extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      codeSnippet: thanosConstants.sampleCode,
      result: null,
      columnNumber: '',
      lineNumber: ''
    };
    /*
      let myString = 'abcd'
      myString.InsertAt('-string-', 2)
      result: ab-string-cd

      Use: For adding error in the editor at appropriate position
     */
    String.prototype.InsertAt=function(substring, position){
      return this.slice(0, position) + substring + this.slice(position)
    }

    /*
      Retun a random element fromt he array

      Use: Showing different success message at different time
     */
    Array.prototype.random = function(){
      return this[Math.floor(Math.random()*this.length)];
    }
  }

  /*
    Updates the state as the user start typing in the editor
   */
  handleEditor = (e) => {
    this.setState({codeSnippet: e.target.value, result: null})
  }

  /*
    Can move this to a utility.js and reuse it across the project
    Keeping it here for now, Since the function is the main part in this assignment
   */
  validateBrackets = () => {
    const { codeSnippet } = this.state
    const { bracketErrorMap } = thanosConstants
    let parentheses = "[]{}()",
      stack = [],
      i, character, bracketPosition, errorLocation;

    for(i = 0; character = codeSnippet[i]; i++) {
      bracketPosition = parentheses.indexOf(character);
      if(bracketPosition === -1) {
        // The charactere isn't a bracket
        continue;
      }
      if(bracketPosition % 2 === 0) {
        // The character is a bracket
        errorLocation = i
        stack.push(bracketPosition + 1); // push next expected brace position
      } else {
        let stackPointer = stack[stack.length -1 ]
        if (stack.length > 0 && stackPointer !== bracketPosition) {
          /*
            Opening bracket and closing brackets are different
            Show error at opening bracket position
           */
          stack.pop();
          return {isvalid: false, position: errorLocation, errortext: bracketErrorMap[0]};
        }
        if(stack.length === 0 || stackPointer !== bracketPosition) {
          /*
            Opening bracket is not present
           */
          errorLocation = i
          stack.pop();
          return {isvalid: false, position: errorLocation, errortext: bracketErrorMap[1]};
        }
        stack.pop();
      }
    }
    /*
      Return true if stack is empty
      if isvalid: false; only opening bracket is present at errorLocation
     */
    return {isvalid:(stack.length === 0), position: errorLocation, errortext: bracketErrorMap[2]};
  }

  /**
   * Get the exact location at with the error occured, [lineNumber:columnNumber]
   * @param  {string} codeSnippet Code snippet
   * @param  {number} position    Position at which error occured
   * @return {object}             object of lineNumber and columnNumber
   */
  getErrorRowAndColumn = (codeSnippet, position) => {
    const rowColumnArray = JSON.stringify(codeSnippet.slice(0, position)).split(/\\n/) || []
    const lineNumber = rowColumnArray.length;
    const columnNumber = rowColumnArray[lineNumber - 1].length
    return {
      lineNumber: lineNumber,
      columnNumber: columnNumber
    }
  }

  showResults = () => {
    const resultObject = this.validateBrackets()
    const { isvalid, errortext, position } = resultObject
    let codeSnippet = this.state.codeSnippet;
    const errorObject = this.getErrorRowAndColumn(codeSnippet, position)
    this.setState({result: resultObject})
    /*
      Append error in the code snippet if the snippet is not valid
     */
    if (!isvalid) {
      this.setState({
        codeSnippet: codeSnippet.InsertAt(`\n\n<===== ^${errortext} =====>\n`, position+1),
        lineNumber: errorObject.lineNumber,
        columnNumber: errorObject.columnNumber
      })
    }
  }

  renderResult = () => {
    const { BRACKET_SUCCESS_MAP } = thanosConstants
    /*
      Don't show result container if the result object is null/empty
     */
    if (!this.state.result)
      return null
    const { columnNumber, lineNumber } = this.state;
    const { isvalid, errortext, position } = this.state.result
    return (
      <div className="result-container">
        <ResultHead isvalid={isvalid}>{!!isvalid? BRACKET_SUCCESS_MAP.random(): 'Compilation Error'}</ResultHead>
      {!isvalid && <ErrorDetails>Error occured at: {lineNumber}:{columnNumber}</ErrorDetails>}
      </div>
    )
  }

  render () {

    return(
      <EditorPage>
        <EditorSection>
          <TextArea value={this.state.codeSnippet} onChange={this.handleEditor} />
          <ButtonContainer>
            <Button onClick={this.showResults}>Validate</Button>
          </ButtonContainer>
          <ResultContainer>
            {this.renderResult()}
          </ResultContainer>
        </EditorSection>
      </EditorPage>
    );
  }
}

BracketMatcher.propTypes = propTypes

export default BracketMatcher

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
  background: rgb(40, 44, 52);
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
      result: null
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

  handleEditor = (e) => {
    this.setState({codeSnippet: e.target.value, result: null})
  }

  validateBrackets = () => {
    const { codeSnippet } = this.state
    const { bracketErrorMap } = thanosConstants
    let parentheses = "[]{}()",
      stack = [],
      i, character, bracePosition, errorLocation;

    for(i = 0; character = codeSnippet[i]; i++) {
      bracePosition = parentheses.indexOf(character);
      if(bracePosition === -1) {
        continue;
      }
      if(bracePosition % 2 === 0) {
        errorLocation = i
        stack.push(bracePosition + 1); // push next expected brace position
      } else {
        let stackPointer = stack[stack.length -1 ]
        if (stack.length > 0 && stackPointer !== bracePosition) {
          /*
            Opening bracket and closing brackets are different
            Show error at opening bracket position
           */
          stack.pop();
          return {isvalid: false, position: errorLocation, errortext: bracketErrorMap[0]};
        }
        if(stack.length === 0 || stackPointer !== bracePosition) {
          if (bracePosition % 2 === 1) {
            /*
              Opening bracket is not present
             */
            errorLocation = i
          }
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

  showResults = () => {
    const resultObject = this.validateBrackets()
    const { isvalid, errortext, position } = resultObject
    let codeSnippet = this.state.codeSnippet;
    this.setState({result: resultObject})
    if (!isvalid) {
      this.setState({codeSnippet: codeSnippet.InsertAt(`\n\n<===== ^${errortext} =====>\n`, position+1)})
    }
  }

  renderResult = () => {
    const { BRACKET_SUCCESS_MAP } = thanosConstants
    if (!this.state.result)
      return null
    const { isvalid, errortext, position } = this.state.result
    return (
      <div className="result-container">
        <ResultHead isvalid={isvalid}>{!!isvalid? BRACKET_SUCCESS_MAP.random(): 'Compilation Error'}</ResultHead>
        {!isvalid && <ErrorDetails>Error at string position: {position}</ErrorDetails>}
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

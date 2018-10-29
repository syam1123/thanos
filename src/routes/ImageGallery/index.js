import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {  getImages } from 'actions'
import { ImageContainer } from 'containers'

const SearchContainer = styled.div`

`

const SearchBox = styled.input`

`

const Button = styled.button`

`


class ImageGallery extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      keyWord: props.match.params.keyword || ''
    };
  }

  componentWillMount() {
    if (this.props.match.params.keyword) {
      this.props.getImages(this.state.keyWord)
    }
  }

  updateKeyWord = (e) => {
    this.setState({keyWord: e.target.value})
  }

  searchImages = () => {
    const { getImages, history } = this.props
    getImages(this.state.keyWord)
    history.push(`/images/${this.state.keyWord}`)
  }

  render () {
    return(
      <SearchContainer>
        <SearchBox value={this.state.keyWord} onChange={this.updateKeyWord} />
        <Button onClick={this.searchImages}>Search</Button>
        <ImageContainer
          {...this.props}
          images={this.props.images}
        />
      </SearchContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getImages: (query) => {
      dispatch(getImages(query))
    }
  }
}

function mapStateToProps(state) {
  const { images } = state.appReducer
  return {
    images
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery)

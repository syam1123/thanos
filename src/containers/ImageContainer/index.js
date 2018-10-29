import React, { Component } from 'react'
import styled from 'styled-components'

const ImageSection = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  .largeImage {
    width: 100%;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em;
  }
`

const Image = styled.img`
  max-height: 200px;
  width: auto;
`


class ImageContainer extends Component {

  constructor(props){
  	super(props)
  	this.state = {
      imageItems: [],
      imagePresentInUrl: false,
      seelctedImageUrl: ''
    }
    this.container = React.createRef()
  }

  componentWillMount() {
    this.checkForImageInUrl()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.props.images) {
      this.setState({imageItems: nextProps.images.items}, this.checkForAlreadyOpened(nextProps.images.items))
      this.removeElement('largeImage')
    }
  }

  checkForImageInUrl = () => {
    const { history } = this.props
    const { location } = history
    if (location.search.split('?image=')[1])
      this.setState({imagePresentInUrl: true, seelctedImageUrl: location.search.split('?image=')[1]})
  }

  checkForAlreadyOpened = (imageItems) => {
    const { seelctedImageUrl, imagePresentInUrl} = this.state
    this.getImageFromUrl(seelctedImageUrl, imageItems)
  }

  getImageFromUrl = (url, imageItems) => {
    console.log("imageItems", imageItems);
    const selectedImage = imageItems.filter((item) => {
      return item.link == url
    })
    console.log("selectedImage[0]", selectedImage[0]);
    if (selectedImage[0]) {
      this.setState({selectedImage: selectedImage[0]})
    }

  }

  getImageEndAndAppendContainer = (imageElements, position) => {
    if (!imageElements)
      return
    for (let i=position; i<=imageElements.length-1; i++) {
      let prevHeight
      if (i > 0) {
        prevHeight = imageElements[i - 1].y
      }
      if (prevHeight && imageElements[i].y > prevHeight) {
        this.removeElement('largeImage')
        let element = document.createElement("div");
        element.className = "largeImage";
        element.id=`position-${i}`
        imageElements[i-1].parentNode.insertBefore(element, imageElements[i-1].nextSibling);
        return element
      }
    }
  }

  removeElement = (className) => {
    let elem = document.getElementsByClassName(className)[0];
    if (elem)
      return elem.parentNode.removeChild(elem);
  }

  updateUrlWithImageId = (eachImage) => {
    const { match, history } = this.props;
    history.push(`${match.url}?image=${eachImage.link}`)
  }

  getLargerView = (eachImage) => {
    const { imageItems } = this.state
    const position = imageItems.indexOf(eachImage)
    const images = document.getElementsByClassName('eachImage');
    let element = this.getImageEndAndAppendContainer(images, position)
    if (!element) {
      element = document.createElement('div')
      element.className = 'selectedLargeImage'
    }
    const imageNode = document.createElement("img");
    imageNode.src = eachImage.link
    element.appendChild(imageNode);
    this.updateUrlWithImageId(eachImage)
  }

  render () {
    const { imageItems } = this.state
    if (!imageItems)
      return null
    return(
      <ImageSection ref={this.container}>
        {
          imageItems.map((eachImage) => {
            return (
              <Image onClick={() => this.getLargerView(eachImage)} className="eachImage" key={eachImage.title} src={eachImage.link} />
            )
          })
        }
      </ImageSection>
    );
  }
}


export default ImageContainer

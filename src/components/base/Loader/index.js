import React from 'react'
import PropTypes from 'prop-types'
import styled, {css, keyframes} from 'styled-components'

const Loader = (props) => {
	return (
		<PageContainer>
			<LoaderContainer {...props}>
				<div className="bar bar-top"></div>
				<div className="bar bar-right"></div>
				<div className="bar bar-bottom"></div>
				<div className="bar bar-left"></div>
			</LoaderContainer>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 95vh;
	width: 100vw;
`
const LoaderContainer = styled.div`
	display: inline-block;
	position: relative;
	width: 64px;
	height: 64px;
	&:after {
		content: " ";
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 6px;
		box-sizing: border-box;
		border: 26px solid orange;
		border-color: orange transparent orange transparent;
		animation: lds-hourglass 1.2s infinite;
	}
	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}
`

const propTypes = {

}

const defaultProps = {

}

Loader.propTypes = propTypes
Loader.defaultProps = defaultProps

export default Loader

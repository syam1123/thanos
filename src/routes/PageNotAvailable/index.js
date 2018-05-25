import React from "react";
import styled from "styled-components";

import { GlobalImages } from 'assets';

const Page404Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    max-width: 90%;
    margin: auto;
    display: block;
    max-height: 50vh;
  }
  p{
    text-align: center;
    font-family: avenir;
    font-size: 1.7em;
    color: var(--gray);
    margin-top: 2em;
    max-width: 90%;
    margin: auto;
    margin-top: 2em;
  }
`

const PageNotAvailable = (props) => {
  return(
    <Page404Container>
      <div>
        <img src={GlobalImages.PageNotAvailable} alt="" />
        <p>Sorry! The page you are requesting is not available</p>
      </div>
    </Page404Container>
  )
}

export default PageNotAvailable;

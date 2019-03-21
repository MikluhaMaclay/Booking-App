import React from 'react'
import styled from 'styled-components';

const StyledDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,0.75);
`;

const Backdrop = (props) => {
  return (
    <StyledDrop>
      
    </StyledDrop>
  )
}

export default Backdrop

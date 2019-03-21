import React from "react";
import styled from "styled-components";

const ModalWindow = styled.div`
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: 5%;

  @media (min-width: 769px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }

  > header {
    padding: 1rem;
    background: palevioletred;
    color: white;
    > h1 {
      margin: 0;
      font-size: 1.25rem;
    }
  }
`;

const ModalContent = styled.section`
  padding: 1rem;
`;

const ModalButtons = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: palevioletred;
  font: inherit;
  border: 1px solid palevioletred;
  border-radius: 3px;
  color: white;
  padding: 0.25rem 1rem;
  margin-right: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.26);
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    box-shadow: 2px 2px 5px rgba(219, 112, 147, 0.7);
    background-color: #de7d9c;
  }

  &:focus {
    outline-color: palevioletred;
  }
`;

const Modal = props => {
  return (
    <ModalWindow>
      <header>{props.title}</header>
      <ModalContent>{props.children}</ModalContent>
      <ModalButtons>
        {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
        {props.canCreate && <Button onClick={props.onSubmit}>Create</Button>}
      </ModalButtons>
    </ModalWindow>
  );
};

export default Modal;

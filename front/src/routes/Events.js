import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Modal/Backdrop";

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

const EventsControl = styled.div`
  text-align: center;
  border: 2px solid palevioletred;
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  max-width: 80%;
`;

function Events() {
  const [creating, setCreating] = useState(false);
  const handleCreateEvent = () => {
    setCreating(true);
  };

  const handleModalCancel = () => {
    setCreating(false);
  };

  const handleModalSubmit = () => {
    setCreating(false);
  }

  return (
    <EventsControl>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title={"Add your event!"}
          canCancel
          canCreate
          onCancel={handleModalCancel}
          onSubmit={handleModalSubmit}
        >
          Content
        </Modal>
      )}
      <p>Add your Event!</p>
      <Button onClick={handleCreateEvent}>Create Event</Button>
    </EventsControl>
  );
}

export default Events;

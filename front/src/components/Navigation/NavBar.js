import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/auth";

const NavBarMain = styled.header`
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: palevioletred;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  > div > h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  > nav {
    margin: 0 0 0 1.5rem;

    > ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      > li {
        margin: 0 1rem;

        > a {
          text-decoration: none;
          color: white;

          &:hover,
          &:active {
            color: #669999;
          }

          &.active {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

function NavBar(props) {
  const authContext = useContext(AuthContext);
  return (
    <NavBarMain>
      <div>
        <h1>BookApp</h1>
      </div>
      <nav>
        <ul>
          {!authContext.token && <li>
            <NavLink to="/login">Auth</NavLink>
          </li>}
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          {authContext.token && <li>
            <NavLink to="/events">Events</NavLink>
          </li>}
        </ul>
      </nav>
    </NavBarMain>
  );
}

export default NavBar;

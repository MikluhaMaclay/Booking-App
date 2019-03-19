import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import AuthContext from './../context/auth';

const Form = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
`;

const FormControl = styled.div`
  margin: 1rem;
  > label,
  > input {
    width: 100%;
    display: block;
  }

  > label {
    margin-bottom: 0.5rem;
  }
`;

const FormActions = styled.div`
  > button {
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
    }

    &:focus {
      outline-color: palevioletred;
    }
  }
`;

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
  };

  const authContext = useContext(AuthContext);
  

  const submitHandler = event => {
    event.preventDefault();
    console.log(authContext);
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().lenth === 0 || password.trim().length === 0) {
      return;
    }

    let reqBody;
    if (!isLogin) {
      reqBody = {
        query: `
            mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                    _id
                    email
                }
            }
            `
      };
    } else {
      reqBody = {
        query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
            `
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then(data => {
        if(isLogin) {
          const token =data.data.login.token;
          const userId = data.data.login.userId;
          const tokenExpiration = data.data.tokenExpiration;
          authContext.login(token, userId, tokenExpiration);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormControl>
        <label htmlFor="email">E-Mail</label>
        <input type="email" ref={emailEl} />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordEl} />
      </FormControl>
      <FormActions>
        <button type="submit">{!isLogin ? "SignUp" : "Login"}</button>
        <button type="button" onClick={handleSwitchMode}>
          Switch to {isLogin ? "SignUp" : "Login"}
        </button>
      </FormActions>
    </Form>
  );
}

export default Login;

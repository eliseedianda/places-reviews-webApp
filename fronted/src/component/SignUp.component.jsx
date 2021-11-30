import React, { useState, useRef } from "react";
import axios from "axios";
import { Cancel } from "@material-ui/icons";
import "./SignUp.style.component.css";

const SignUp = ({ setShowsignUp }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/signup", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="signupContainer">
      <div className="logo">ED-MAP</div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="signupbtn">Sign Up</button>
        {success && (
          <span className="success">Successfull.you can sign in now</span>
        )}
        {error && <span className="wrong">something went wrong</span>}
      </form>
      <Cancel className="cancelsignup" onClick={() => setShowsignUp(false)} />
    </div>
  );
};
export default SignUp;

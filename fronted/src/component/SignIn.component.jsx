import React, { useState, useRef } from "react";
import axios from "axios";
import { Cancel } from "@material-ui/icons";
import "./SignIn.style.css";

const SignIn = ({ setShowsignIn, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,

      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/signin", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowsignIn(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="signinContainer">
      <div className="logo">ED-MAP</div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />

        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="signinbtn">Sign In</button>

        {error && <span className="wrong">something went wrong</span>}
      </form>
      <Cancel className="cancelsignin" onClick={() => setShowsignIn(false)} />
    </div>
  );
};
export default SignIn;

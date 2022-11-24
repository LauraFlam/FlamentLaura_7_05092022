import React, { useState } from "react";
import axios from 'axios';
import Error  from "./Error";

const LoginForm = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const handleLogin = (e) => {
  e.preventDefault();

  axios({
    method: "post",
    url: `http://localhost:3000/api/auth/login`,
    withCredentials: true,
    data: {email, password},
  })
  .then((res) => {window.location = "/"})
  .catch((err) => {setErrorMessage(err.response.data.error)});
};


  return (
    <>
    {errorMessage && <Error className="alert alert-error" value={errorMessage} />}
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label>Email</label>
      <br />
      <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <div className="email error"></div>
      <br />
      <label>Mot de passe</label>
      <br />
      <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
    </>
  );
};

export default LoginForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


export default function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function redirect() {
    navigate("/login");
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]+$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const signup = () => {


  Axios.post("http://localhost:3000/api/auth/signup", {
    email: email,
    password: password,
  })/*.then((response) => {
    redirect();*/
    .then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error.message);
      console.log(error.response);
      console.log(error.request);
  });
};

function emailValidation(email, password) {
  if (!email.match(EMAIL_REGEX)) {
    alert("Erreur : votre email est invalide !");
    return;
  } else if (!password.match(PASSWORD_REGEX)) {
    alert("Erreur : votre mot de passe est invalide !");
    return;
  } 
  signup();
}

return (
  <div className="form-container">
    

    <div className="form-container-box">
      <div className="inputs">
      
        <div className="input">
          <label htmlFor="inputEmail">Email</label>
          <input type="email" className="form-control" id="inputEmail" onChange={(e) => {setEmail(e.target.value);}}
          ></input>
        </div>

        <div className="input">
          <label htmlFor="inputPassword">Mot de passe</label>
          <input className="form-control" id="inputPassword" type="password" onChange={(e) => {setPassword(e.target.value);}}
          ></input>
        </div>
      </div>

      <div className="button-login-container">
        <button className="submit-btn-login" onClick={(() => signup, () => emailValidation(email, password))}>
          S'INSCRIRE
        </button>
      </div>
    </div>
  </div>
);
}


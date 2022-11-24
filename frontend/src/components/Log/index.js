import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
  const [SignUpModal, setSignUpModal] = useState(true);
  const [LoginModal, setLoginModal] = useState(false);

  const Modals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li onClick={Modals} id="register">S'inscrire</li>
          <li onClick={Modals} id="login">Se connecter</li>
        </ul>
        {SignUpModal && <SignUpForm />}
        {LoginModal && <LoginForm />}
      </div>
    </div>
  );
};


export default Log;
import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  }

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
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
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUpForm;
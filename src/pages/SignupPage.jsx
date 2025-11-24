import React from "react";
import { useState } from "react";
import SignupForm from "../components/SignupForm";
import SignupSuccess from "../components/signupsuccess";

const AuthPage = () => {
    const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      {!submitted ? (
        <SignupForm onSubmitSuccess={() => setSubmitted(true)} />
      ) : (
        <SignupSuccess />
      )}
    </div>
  );
};

export default AuthPage;

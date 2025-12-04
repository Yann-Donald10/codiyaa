import React from "react";
import { useState } from "react";
import ResetPassword from "../components/ResetPwd";
import ResetPwdSuccess from "../components/ResetPwdSuccess";

const ResetPwdPage = () => {
    const [submitted, setSubmitted] = useState(false);
    console.log(submitted)
  return (
    <div>
      {!submitted ? (
        <ResetPassword onSubmitSuccess={() => setSubmitted(true)} />
      ) : (
        <ResetPwdSuccess />
      )}
    </div>
  );
};

export default ResetPwdPage;

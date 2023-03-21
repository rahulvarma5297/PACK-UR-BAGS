import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginForm.css";
import TopBtn from "./TopBtn";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";
import axios from "axios";

function Verification(props) {
  const { id } = useParams()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loginError, setLoginError] = useState([false, ""]);
  const closeLoginError = () => {
    setLoginError([false, "",""]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email.trim().length < 1 || // eslint-disable-next-line
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setLoginError([true, "Invalid Email"]);
    }
    axios
      .post("http://localhost:9000/users/verify", { email: email, otp: otp })
      .then((res) => {
        if(res.status === 200){
            navigate(`/${res.data.keyword}/${email}`);
        } else {
            setLoginError([true, res.data.msg]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <TopBtn heading={"Verify Your Email"} />
      <form className="loginForm" onSubmit={submitHandler}>
        {loginError[0] && (
          <Error msg={loginError[1]} type={loginError[2]} onClick={closeLoginError} />
        )}
        <InputBox
          placeholder={"Enter Your Email"}
          leftIcon={"bi bi-key-fill"}
          type={"text"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Btn
          type={"button"}
          value={"Send OTP"}
          onClick={() => {
            axios
              .post("http://localhost:9000/users/generateOTP", { email: email, keyword: id })
              .then((resp) => {
                if(resp.status === 200){
                    setLoginError([true, resp.data.msg, "success"]);
                } else {  
                    setLoginError([true, resp.data.msg, "error"]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <InputBox
          placeholder={"Enter OTP"}
          leftIcon={"bi bi-person-fill"}
          type={"text"}
          name={"otp"}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Btn type={"submit"} value={"Verify"} onClick={props.closeRegister} />
      </form>
    </div>
  );
}

export default Verification;

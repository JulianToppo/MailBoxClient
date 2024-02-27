import React, { useState } from "react";
import { useRef } from "react";
import { backendURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const confirmpassword = useRef();
  const navigate = useNavigate();

  const [isLogin, setisLogin] = useState(false);

  const sendSignpUpRequest = async (formObj) => {
    try {
      const response = await fetch(backendURL + "signup", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const data = await response.json();
      if (response.ok) {
        console.log("User has successfully signed up");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const sendLoginRequest = async (formObj) => {
    try {
      const response = await fetch(backendURL + "login", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("User has successfully logged in");
        localStorage.setItem('token',data.token)
        navigate("/home");
      } else {
        console.log("Data Error",data.message)
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
      console.log("Login Error:",error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isLogin && password.current.value !== confirmpassword.current.value) {
      alert("Passwords not matched");
    }
    console.log(email.current.value, password.current.value);
    const formObj = {
      email: email.current.value,
      password: password.current.value,
    };

    if (isLogin) {
      sendLoginRequest(formObj);
      email.current.value = "";
      password.current.value = "";
    } else {
      sendSignpUpRequest(formObj);
      email.current.value = "";
      password.current.value = "";
      confirmpassword.current.value = "";
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen rounded-lg">
      <div className="flex flex-col w-1/2">
        <form
          className="flex flex-col rounded-lg space-y-4 bg-blue-200 p-8"
          onSubmit={onSubmitHandler}
        >
          <h1 className="self-center font-semibold text-2xl">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              className="rounded-md p-2 "
              ref={email}
              type="email"
              required
            ></input>
          </div>

          <div className="flex flex-col">
            <label>Password:</label>
            <input
              className="rounded-md p-2"
              ref={password}
              type="password"
              required
            ></input>
          </div>
          {!isLogin && (
            <div className="flex flex-col">
              <label>Confirm Password:</label>
              <input
                className="rounded-md p-2 "
                ref={confirmpassword}
                type="password"
                required
              ></input>
            </div>
          )}
          <button className="bg-lime-300 p-3 rounded-2xl" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && <p className="self-center">Forgot Password?</p>}
        </form>
        <div className="bg-lime-200 w-full p-4 border-stone-600 border-2 flex justify-center">
          <button className="text-justify" onClick={() => setisLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Signup"
              : "Have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

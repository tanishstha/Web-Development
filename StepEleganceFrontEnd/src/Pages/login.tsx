import "./login.css";
import shoeimg from "../assets/loginLogo.png";
import logoimg from "../assets/logo-removebg.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

function Login() {
  interface FormData {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8087/authenticate",
        formData
      );
      if (response.status === HttpStatusCode.Ok) {
        toast.done("Login success");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };
  return (
    <>
      <div className="login-box">
        <div className="rectangle"></div>
        <div className="main-login-box">
          <div className="welcome-part">
            <h2 className="title-heading-welcome">WELCOME</h2>
            <img src={shoeimg} alt="" className="login-shoe-img" />
          </div>
          <div className="login-form-part">
            <form onSubmit={handleSubmit} className="login-info">
              <div className="login-form-info">
                <img src={logoimg} alt="" className="SE-logo" />
                <div className="user-pass">
                  <input
                    type="text"
                    name="email"
                    className="user-detail"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="user-detail"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <button className="login-bttn" onSubmit={handleSubmit}>
                    <a href="/" className="login-bttn-link"></a>LOG-IN
                  </button>
                  <a href="/forgot" className="forgetbttn">
                    {" "}
                    Forget Password
                  </a>
                  <div className="for-registration">
                    <label htmlFor="">
                      {" "}
                      Don't have an account?{" "}
                      <button className="signin-bttn">
                        <a href="/registration" className="links">
                          {" "}
                          SIGN-IN
                        </a>
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

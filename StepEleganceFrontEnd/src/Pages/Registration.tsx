import "./Registration.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import myImage from '../assets/images/registrationbg.png';

function Registration() {
  interface FormData {
    firstName: string;
    lastName: string; 
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    role: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Check if passwords match and update error message
    if (name === "password" || name === "confirmPassword") {
      const confirmPassword =
        name === "password" ? formData.confirmPassword : value;
      validatePasswords(value, confirmPassword);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check again for password match before submitting
    validatePasswords(formData.password, formData.confirmPassword);

    if (!passwordError) {
      try {
        const response = await axios.post(
          "http://localhost:8087/user/save",
          formData
        );

        // Handle the response as needed
        console.log("Registration successful:", response.data);
        navigate("/login");
      } catch (error) {
        // Handle errors
        console.error("Registration failed:", error);
      }
    }
  };
  return (
    <>
      <div className="registrationbg">
        <div className="mainbox">
          <div className="header">
            <h2>REGISTRATION PAGE</h2>
          </div>
          <div className="below">
            <form className="regform" onSubmit={handleSubmit}>
              {/* <img src={myImage} alt='shoe bg' /> */}
              <div className="leftright">
                <div className="row1">
                  <div className="fname">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder=" FIRST NAME "
                      required
                    />
                  </div>
                  <div className="lname">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder=" LAST NAME"
                      required
                    />
                  </div>
                  <div className="email">
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" EMAIL "
                      required
                    />
                  </div>

                  <div className="date">
                    <label>Date Of Birth:</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row2">
                  <div className="password">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=" CONFIRM PASSWORD "
                      required
                    />
                  </div>
                  <div className="confirmpassword">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      placeholder=" PASSWORD "
                      required
                    />
                  </div>
                  <div className="phonenumber">
                    <label>Phone Number:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" PHONE NUMBER "
                      required
                    />
                  </div>
                  <div className="gender">
                    <label>Gender:</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">--- Select---</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="confirmbttn">
                <button>Confirm</button>
              </div>
            </form>
            </div>
            <div className="cs">
              <div className="signin">
                <label>Already have an account? </label>
                  <button className="Signin-bttn"><a href="/login" className="login-link-bttn"> SIGN-IN</a> </button>
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}

export default Registration;

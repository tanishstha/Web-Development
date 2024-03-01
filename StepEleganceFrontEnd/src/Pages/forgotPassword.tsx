import React, { useState } from "react";
import axios from "axios";
import "./forgotPassword.css";
import lock from "../assets/lock2.png";
import email from "../assets/email-removebg-preview.png";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordProps {
  email: string;
  otp: string;
  password: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [resetStep, setResetStep] = useState<"email" | "otp" | "password">(
    "email"
  );
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string>("");
  const [otpValid, setOtpValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpInput(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (resetStep === "email") {
        const response = await axios.post(
          "http://localhost:8087/user/sendotp",
          { email: emailInput, otp: otpInput, password: passwordInput }
        );
        console.log("OTP sent successfully\nresponse: ", response.data);
        setEmailNotFound(!response.data);
        if (response.data) {
          setResetStep("otp");
          response.data = false;
        }
      } else if (resetStep === "otp") {
        const response = await axios.post(
          `http://localhost:8087/user/sendotp`,
          { email: emailInput, otp: otpInput, password: passwordInput }
        );
        console.log("otp send successfully \nresponse: ", response.data);
        setOtpValid(response.data);
        if (response.data) {
          setResetStep("password");
        }
      } else if (resetStep === "password") {
        // Handle the password reset logic, e.g., send a request to update the password
        // You can check if the password and confirmPassword match before making the request
        if (passwordInput === confirmPasswordInput) {
          // Make a request to update the password
          const response = await axios.post(
            `http://localhost:8087/user/sendotp`,
            { email: emailInput, otp: otpInput, password: passwordInput }
          );
          console.log("Password reset successfully ", response.data);
          if (response.data) {
            alert("Password changed successfully.");
            navigate("/login");
          } else {
            console.log("reset password failed");
          }
          // Handle the response or update the UI as needed
        } else {
          // Password and confirmPassword don't match
          console.error("Password and confirmPassword do not match");
          // Display an error message or update the UI accordingly
        }
      }
    } catch (error: any) {
      console.error("Error:", error.response.data.message);
      if (error.response.data.message === "Email not found") {
        setEmailNotFound(true);
      }
      // Handle other errors or update the UI accordingly
    }
  };

  return (
    <>
      <div className="parent">
        <div className="centerbox">
          {/* Lock Image */}
          <div className="lock">
            <img src={lock} alt="lock icon" />
          </div>

          {/* Title and Description */}
          <div className="text">
            <h2>Forgot Password</h2>
            {resetStep === "email" || "otp" ? (
              <p>
                Enter your email, and we will send you an OTP to reset your
                password.
              </p>
            ) : (
              <p>Enter your new password to reset your password.</p>
            )}
          </div>

          {/* Email Input (conditionally rendered) */}
          {resetStep === "email" && (
            <div className="email">
              <img src={email} alt="email icon" />
              <input
                type="email"
                placeholder="email"
                value={emailInput}
                onChange={handleEmailChange}
                required
              />
            </div>
          )}

          {resetStep === "otp" && !emailNotFound && (
            <>
              <div className="otp-field">
                <input
                  type="text"
                  placeholder="otp"
                  value={otpInput}
                  onChange={handleOtpChange}
                  required
                />
              </div>
            </>
          )}

          {/* Password and Confirm Password Input (conditionally rendered) */}
          {resetStep === "password" && !emailNotFound && otpValid && (
            <>
              <div className="password">
                <input
                  type="password"
                  placeholder="password"
                  value={passwordInput}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="confirm-password">
                <input
                  type="password"
                  placeholder="confirm password"
                  value={confirmPasswordInput}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            </>
          )}

          {/* Error message for email not found */}
          {emailNotFound && (
            <div className="error-message">
              <p>Email not found. Please check your email and try again.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="submit">
            <button type="button" onClick={handleSubmit}>
              {resetStep === "email" || "otp" ? "Submit" : "Reset Password"}
            </button>
          </div>

          {/* Back to Login Link */}
          <div className="back">
            <a href="/login">&lt;back to login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
import "./contactUs.css";
import { useState, useRef } from "react";
import TopBar from "../components/topBar";
import FooterComp from "../components/footerComp";
import axios from "axios";

function contactUs() {
  interface contactUSFourum {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }
  const [formData, setFormData] = useState<contactUSFourum>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response: string = await axios.post(
        "http://localhost:8087/contact-us/save",
        formData
      );
      console.log("Contact Us response: ", response);
    } catch (error) {
      console.error("Contact us error", error);
    }
  };

  return (
    <>
      <div className="body">
        <TopBar />
        <div className="forum">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <h1>Contact Us</h1>
            </div>
            <div className="title-message">
              <h2 className="message">We would love to hear from you!</h2>
            </div>
            <div className="feedbackInputs">
              <div className="fullNameInput">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="emailInput">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="subjectInput">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="messageInput">
                <textarea
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="sendButton">
                <button> Send </button>
              </div>
            </div>
          </form>
        </div>
        <FooterComp />
      </div>
    </>
  );
}

export default contactUs;
